/* eslint-disable solid/reactivity */
import type {Accessor, Component, JSXElement} from 'solid-js';
import {onMount} from 'solid-js';
import {createMemo, createRenderEffect, createUniqueId, onCleanup, untrack, useContext} from 'solid-js';
import {createSignal} from 'solid-js';
import {Screen} from '../../components';
import {clamp, emptyArray} from '../../utils';
import {makeSpringStore} from '@universal-stores/spring';
import AsyncLock from 'async-lock';
import {makeLifecycleHooks, buildActivity} from '../activity';
import type {Tab, TabRouterContextContent} from './context';
import {TabRouterContext} from './context';
import type {AriaAttributesProps, DataAttributesProps, SimpleSetter} from '../../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../../solid-extra';

export type TabRouterProps<Tabs extends Record<string, Component<void>>> = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		tabs: Tabs;
		initialTab: keyof Tabs & string;
		ctxRef?(ctx: TabRouterContextContent<keyof Tabs & string>): void;
	};

export class MissingTabRouterError extends Error {
	constructor() {
		super('missing tab router context');
	}
}

export function useTabRouter(): Omit<TabRouterContextContent<string>, 'setContinuousTabIndex' | 'spring$'> & {
	activityTabIndex: Accessor<number>;
	isActive: Accessor<boolean>;
	setOutRatio: SimpleSetter<number>;
	outRatio: Accessor<number>;
	inRatio: Accessor<number>;
	resetOutRatio(): Promise<void>;
} {
	const ctx = useContext(TabRouterContext);
	if (!ctx) {
		throw new MissingTabRouterError();
	}
	const {
		goToTab,
		tabs: tabs,
		activityName,
		busy,
		continuousTabIndex,
		setContinuousTabIndex,
		tabNames,
		spring$,
		activeTabName,
	} = ctx;
	const currTabs = untrack(tabs);
	const activityTabIndex = createMemo(() => Object.keys(tabs()).indexOf(activityName));
	const currTab = currTabs[activityName]!; // This won't change, contrary to the tabIndex that could change when tabs are added/removed.
	const isActive = currTab.activity.isActive;

	return {
		goToTab,
		activityTabIndex,
		isActive,
		continuousTabIndex,
		busy,
		tabs,
		tabNames,
		setOutRatio: (x) =>
			untrack(() =>
				setContinuousTabIndex(clamp(activityTabIndex() - clamp(x, -1, 1), 0, Object.keys(tabs()).length - 1)),
			),
		inRatio: () => clamp(1 - (activityTabIndex() - continuousTabIndex()), 0, 1),
		resetOutRatio: async () => {
			spring$.target$.set(untrack(continuousTabIndex));
			await spring$.skip();
			const unsubscribe = spring$.subscribe(setContinuousTabIndex);
			spring$.target$.set(untrack(activityTabIndex));
			await spring$.idle();
			unsubscribe();
		},
		outRatio: () => clamp(activityTabIndex() - continuousTabIndex(), -1, 1),
		activeTabName,
	};
}

const lifecycleHooks = makeLifecycleHooks(() => {
	const ctx = useContext(TabRouterContext);
	if (!ctx) {
		throw new MissingTabRouterError();
	}
	const {tabs, activityName} = ctx;
	const currTabs = untrack(tabs);
	return currTabs[activityName]!.activity;
});

export const useTabRouterAfterPause = lifecycleHooks.useAfterPause;
export const useTabRouterBeforePause = lifecycleHooks.useBeforePause;
export const useTabRouterAfterResume = lifecycleHooks.useAfterResume;
export const useTabRouterBeforeResume = lifecycleHooks.useBeforeResume;

export function TabRouter<Tabs extends Record<string, Component<void>>>(props: TabRouterProps<Tabs>): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);
	const routerId = createUniqueId();

	const asyncLock = new AsyncLock();
	const asyncLockKey = routerId;
	const acquireLock = async (procedure: () => Promise<void>) => {
		setBusy(true);
		try {
			await asyncLock.acquire(asyncLockKey, () => procedure());
		} finally {
			setBusy(false);
		}
	};
	const [busy, setBusy] = createSignal(false);

	const [rootRouterNode, setRootRouterNode] = createSignal<HTMLElement | undefined>(undefined);
	const [continuousTabIndex, setContinuousTabIndex] = createSignal(0);

	const [tabs, setTabs] = createSignal<Record<keyof Tabs & string, Tab>>({} as any); // TODO: proper init
	const tabNames = createMemo(() => Object.keys(tabs()));
	const [activeTabName, setActiveTabName] = createSignal<keyof Tabs & string>(props.initialTab);

	const spring$ = makeSpringStore(0, {
		stiffness: 512,
		damping: 48,
		precision: 0.01,
	});

	const context: TabRouterContextContent<keyof Tabs & string> = {
		goToTab,
		tabs,
		busy,
		continuousTabIndex,
		tabNames,
		setContinuousTabIndex,
		spring$,
		activeTabName,
	};

	async function internalGoToTab(tabName: string, returnValue?: unknown, skipAnimation = false) {
		const currTabIndex = tabNames().indexOf(activeTabName());
		const targetTabIndex = tabNames().indexOf(tabName);
		if (targetTabIndex === -1) {
			throw new Error(`tab named "${tabName}" not found`);
		}

		const currTabName = tabNames()[currTabIndex];
		if (currTabName === tabName) {
			return;
		}
		const target = tabs()[tabName];
		const curr = tabs()[tabNames()[currTabIndex]];

		for (const cb of curr.activity.callbacks.onBeforePauseCbs ?? emptyArray) {
			await cb();
		}
		for (const cb of target.activity.callbacks.onBeforeResumeCbs ?? emptyArray) {
			await cb(returnValue);
		}
		setActiveTabName(tabName);
		adjustVisibility(targetTabIndex, currTabIndex);

		if (!skipAnimation) {
			spring$.target$.set(untrack(continuousTabIndex));
			await spring$.skip();
			const unsubscribe = spring$.subscribe(setContinuousTabIndex);
			spring$.target$.set(targetTabIndex);
			await spring$.idle();
			unsubscribe();
		} else {
			setContinuousTabIndex(targetTabIndex);
		}

		adjustVisibility(targetTabIndex);

		target.activity.focus();
		for (const cb of curr.activity.callbacks.onAfterPauseCbs ?? emptyArray) {
			await cb();
		}
		for (const cb of target.activity.callbacks.onAfterResumeCbs ?? emptyArray) {
			await cb(returnValue);
		}
	}

	async function goToTab(tabName: string, returnValue?: unknown, skipAnimation = false) {
		if (tabName === untrack(activeTabName)) {
			return;
		}
		await spring$.skip();
		await acquireLock(() => internalGoToTab(tabName, returnValue, skipAnimation));
	}

	createRenderEffect(() => {
		const currRootNode = rootRouterNode();
		void props.tabs; // Tracking
		if (!currRootNode) {
			return;
		}
		const currTabs = {...untrack(tabs)};
		const newTabs = {...untrack(() => props.tabs)};

		// Remove tabs that are no longer present in the new setup
		for (const tabName of Object.keys(currTabs)) {
			if (!(tabName in newTabs)) {
				currTabs[tabName].activity.dispose();
				delete currTabs[tabName];
			}
		}

		// Add new tabs and replace the once with a different component
		const newTabNames = Object.keys(newTabs);
		for (let i = 0; i < newTabNames.length; i++) {
			const tabName = newTabNames[i];
			if (!currTabs[tabName] || props.tabs[tabName] !== currTabs[tabName].component) {
				currTabs[tabName]?.activity.dispose();

				const component = props.tabs[tabName];
				currTabs[tabName as keyof Tabs & string] = {
					index: i,
					component,
					activity: buildActivity({
						isActive: () => activeTabName() === tabName,
						component: (activityProp) => (
							<TabRouterContext.Provider
								value={{...context, activityId: activityProp.activityId, activityName: tabName}}
							>
								{component()}
							</TabRouterContext.Provider>
						),
						mountPoint: currRootNode,
					}),
				};
			}
		}
		setTabs(() => currTabs);
		const newTabIndex = Math.min(Math.round(untrack(continuousTabIndex)), newTabNames.length - 1);
		for (const {activity} of Object.values(currTabs)) {
			activity.render();
		}
		setContinuousTabIndex(newTabIndex);
		adjustVisibility(newTabIndex);
		setActiveTabName(tabNames()[newTabIndex]);
	});
	function adjustVisibility(activeTabIndex: number, prevTabIndex?: number) {
		untrack(() => {
			for (const name of tabNames()) {
				tabs()[name].activity.root.style.zIndex = '0';
				tabs()[name].activity.root.style.visibility = 'hidden';
			}
			tabs()[tabNames()[activeTabIndex]].activity.root.style.zIndex = '2';
			tabs()[tabNames()[activeTabIndex]].activity.root.style.visibility = 'visible';

			const left = prevTabIndex !== undefined && prevTabIndex < activeTabIndex ? prevTabIndex : activeTabIndex - 1;
			const right = prevTabIndex !== undefined && prevTabIndex > activeTabIndex ? prevTabIndex : activeTabIndex + 1;

			if (left >= 0) {
				tabs()[tabNames()[left]].activity.root.style.zIndex = '1';
				tabs()[tabNames()[left]].activity.root.style.visibility = 'visible';
			}
			if (right <= tabNames().length - 1) {
				tabs()[tabNames()[right]].activity.root.style.zIndex = '1';
				tabs()[tabNames()[right]].activity.root.style.visibility = 'visible';
			}
		});
	}
	onCleanup(() => {
		for (const {activity} of Object.values(tabs())) {
			activity.dispose();
		}
	});
	const [loadingEntryPoint, setLoadingEntryPoint] = createSignal(true);
	onMount(() => {
		(async () => {
			// eslint-disable-next-line solid/reactivity
			await goToTab(props.initialTab as string, undefined, true);
			setLoadingEntryPoint(false);
		})().catch(console.error);
	});

	props.ctxRef?.(context);

	return (
		<Screen
			style={{background: tabRouterBackgroundCSSVar, ...props.style}}
			class={props.class}
			classList={props.classList}
			ref={setRootRouterNode}
			data-loading-entry-point={loadingEntryPoint()}
			data-busy={busy()}
			{...data}
			{...aria}
		/>
	);
}

export const tabRouterBackgroundCSSVar = 'var(--solid-pwa-navigation-router-bg, black)';
