/* eslint-disable solid/reactivity */
// TODO: suggested global CSS config (e.g. html, body {height: 100%})

import {createUniqueId, onCleanup, onMount, useContext} from 'solid-js';
import type {Component, JSXElement, Accessor, Setter} from 'solid-js';
import {createSignal, untrack} from 'solid-js';
import AsyncLock from 'async-lock';
import type {StackRouterContextContent} from './context';
import {StackRouterContext} from './context';
import {makeSpringStore} from '@universal-stores/spring';
import {Screen} from '../../components';
import type {MaybeArray} from '../../utils';
import {alwaysArray, clamp, emptyArray, maybeCall} from '../../utils';
import type {Activity} from '../activity';
import {makeLifecycleHooks} from '../activity';
import {buildActivity} from '../activity';
import type {AriaAttributesProps, DataAttributesProps, SimpleSetter} from '../../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../../solid-extra';

export class MissingStackRouterError extends Error {
	constructor() {
		super('missing stack router context');
	}
}

export class MissingActivityError extends Error {
	constructor(msg: string) {
		super(`missing activity: ${msg}`);
	}
}

export type StackRouterProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		entryPoint: MaybeArray<Component<void>>;
		ctxRef?(ctx: StackRouterContextContent): void;
	};

export function useStackRouter(): Omit<StackRouterContextContent, 'setContinuousStackIndex' | 'spring$'> & {
	activityStackIndex: number;
	isActive: Accessor<boolean>;
	setOutRatio: SimpleSetter<number>;
	outRatio: Accessor<number>;
	inRatio: Accessor<number>;
	resetOutRatio(): Promise<void>;
} {
	const ctx = useContext(StackRouterContext);
	if (!ctx) {
		throw new MissingStackRouterError();
	}
	const {push, pop, activities, activityId, busy, continuousStackIndex, setContinuousStackIndex, spring$} = ctx;
	const currActivities = untrack(activities);
	const activityStackIndex = currActivities.findIndex((x) => x.id === activityId)!;
	const activity = currActivities.find((x) => x.id === activityId)!;
	const isActive = activity.isActive;

	return {
		activities,
		activityStackIndex,
		pop,
		push,
		isActive,
		continuousStackIndex,
		busy,
		setOutRatio: (x) =>
			untrack(() => setContinuousStackIndex(clamp(activityStackIndex - clamp(x, 0, 1), 0, activities().length - 1))),
		inRatio: () => clamp(1 - (activityStackIndex - continuousStackIndex()), 0, 1),
		resetOutRatio: async () => {
			spring$.target$.set(untrack(continuousStackIndex));
			await spring$.skip();
			const unsubscribe = spring$.subscribe(setContinuousStackIndex);
			spring$.target$.set(activityStackIndex);
			await spring$.idle();
			unsubscribe();
		},
		outRatio: () => clamp(activityStackIndex - continuousStackIndex(), 0, 1),
	};
}

const lifecycleHooks = makeLifecycleHooks(() => {
	const ctx = useContext(StackRouterContext);
	if (!ctx) {
		throw new MissingStackRouterError();
	}
	const {activities, activityId} = ctx;
	const currActivities = untrack(activities);
	return currActivities.find((x) => x.id === activityId)!;
});

export const useStackRouterAfterPause = lifecycleHooks.useAfterPause;
export const useStackRouterBeforePause = lifecycleHooks.useBeforePause;
export const useStackRouterAfterResume = lifecycleHooks.useAfterResume;
export const useStackRouterBeforeResume = lifecycleHooks.useBeforeResume;

export function StackRouter(props: StackRouterProps): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);

	const [loadingEntryPoint, setLoadingEntryPoint] = createSignal(true);
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
	const [activities, _setActivities] = createSignal<Activity[]>([]);
	const setActivities: Setter<Activity[]> = (valueOrUpdater) => {
		const x = maybeCall(valueOrUpdater, untrack(activities));
		for (let i = 0; i < x.length - 2; i++) {
			x[i].root.style.visibility = 'hidden';
		}
		for (let i = Math.max(0, x.length - 2); i < x.length; i++) {
			x[i].root.style.visibility = 'visible';
		}
		return _setActivities(() => x);
	};

	const [continuousStackIndex, setContinuousStackIndex] = createSignal(0);

	const spring$ = makeSpringStore(0, {
		stiffness: 512,
		damping: 48,
		precision: 0.01,
	});

	const context: StackRouterContextContent = {
		push,
		pop,
		activities,
		busy,
		continuousStackIndex,
		setContinuousStackIndex,
		spring$,
	};

	const activeActivityId = () => activities().at(-1)?.id;

	async function addActivity(components: Array<Component<void>>, skipAnimations = false): Promise<void> {
		const mountPoint = untrack(rootRouterNode);
		if (!mountPoint) {
			throw new Error('router root node not found');
		}
		for (let i = 0; i < components.length; i++) {
			const component = components[i];
			const currActivities = untrack(activities);
			const currTopActivity = currActivities.at(-1);
			if (currTopActivity) {
				for (const cb of currTopActivity.callbacks.onBeforePauseCbs ?? emptyArray) {
					await cb();
				}
			}

			const currStackIndex = currActivities.length - 1;
			const newTopActivity = buildActivity({
				mountPoint,
				component: (activityProps) => (
					<StackRouterContext.Provider value={{...context, activityId: activityProps.activityId}}>
						{component()}
					</StackRouterContext.Provider>
				),
				isActive: () => activeActivityId() === newTopActivity.id,
			});
			setActivities([...currActivities, newTopActivity]);
			newTopActivity.render();

			if (!skipAnimations && i === components.length - 1) {
				spring$.target$.set(currStackIndex);
				await spring$.skip();
				const unsubscribe = spring$.subscribe(setContinuousStackIndex);
				spring$.target$.set(currStackIndex + 1);
				await spring$.idle();
				unsubscribe();
			} else {
				setContinuousStackIndex(currStackIndex + 1);
			}

			newTopActivity.focus();
			if (currTopActivity) {
				for (const cb of currTopActivity.callbacks.onAfterPauseCbs ?? emptyArray) {
					await cb();
				}
			}
		}
	}

	async function push(component: MaybeArray<Component<void>>, skipAnimation = false): Promise<void> {
		await spring$.skip();
		await acquireLock(async () => {
			await addActivity(alwaysArray(component), skipAnimation);
		});
	}

	async function removeActivity(opts?: {returnValue?: unknown; count?: number}) {
		const count = opts?.count ?? 1;

		const currActivities = untrack(activities);
		const currTopActivity = currActivities.at(-1);
		if (!currTopActivity) {
			throw new MissingActivityError('top activity is undefined');
		}
		const targetStackIndex = currActivities.length - 1 - count;
		const activityToResume = currActivities[targetStackIndex];
		if (!activityToResume) {
			throw new MissingActivityError(`activity at index ${targetStackIndex} is undefined`);
		}

		for (const cb of activityToResume.callbacks.onBeforeResumeCbs ?? emptyArray) {
			await cb(opts?.returnValue);
		}

		if (count > 1) {
			// dispose all activities in between the target and the top one
			for (let i = 0; i < count - 1; i++) {
				currActivities[currActivities.length - 2 - i].dispose();
			}
			setActivities((cur) => {
				const tmp = cur.slice(0, -count);
				tmp.push(currTopActivity);
				return tmp;
			});
		}

		spring$.target$.set(untrack(continuousStackIndex));
		await spring$.skip();
		const unsubscribe = spring$.subscribe(setContinuousStackIndex);
		spring$.target$.set(targetStackIndex);
		await spring$.idle();
		unsubscribe();

		currTopActivity.dispose();

		setActivities((cur) => cur.slice(0, -1));

		activityToResume.focus();
		if (activityToResume.callbacks.onAfterResumeCbs) {
			for (const cb of activityToResume.callbacks.onAfterResumeCbs) {
				await cb(opts?.returnValue);
			}
		}
	}

	async function pop(opts?: {returnValue?: unknown; count?: number}): Promise<void> {
		await spring$.skip();
		await acquireLock(() => removeActivity(opts));
	}

	onMount(() => {
		(async () => {
			// eslint-disable-next-line solid/reactivity
			await push(props.entryPoint, true);
			setLoadingEntryPoint(false);
		})().catch(console.error);
	});

	onCleanup(() => {
		for (const activity of activities()) {
			activity.dispose();
		}
	});

	props.ctxRef?.(context);

	return (
		<Screen
			style={{background: stackRouterBackgroundCSSVar, ...props.style}}
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

export const stackRouterBackgroundCSSVar = 'var(--solid-pwa-navigation-router-bg, black)';
