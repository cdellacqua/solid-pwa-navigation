import type {Accessor, Component} from 'solid-js';
import {createUniqueId, untrack} from 'solid-js';
import type {MaybePromise} from '../utils';
import {noop} from '../utils';
import {render} from 'solid-js/web';

export type Activity = {
	root: HTMLElement;
	render: () => void;
	dispose: () => void;
	focus: () => void;
	id: string;
	callbacks: {
		onBeforePauseCbs?: Array<() => MaybePromise<void>>;
		onBeforeResumeCbs?: Array<(returnValue: unknown) => MaybePromise<void>>;
		onAfterPauseCbs?: Array<() => MaybePromise<void>>;
		onAfterResumeCbs?: Array<(returnValue: unknown) => MaybePromise<void>>;
	};
	isActive: Accessor<boolean>;
};

const focusableSelector = [
	'a[href]',
	'area[href]',
	'button:not([disabled]):not([aria-hidden])',
	'input:not([disabled]):not([aria-hidden]):not([type="hidden"])',
	'select:not([disabled]):not([aria-hidden])',
	'textarea:not([disabled]):not([aria-hidden])',
	'embed',
	'iframe',
	'object',
	'[contenteditable]',
	'[tabindex]:not([tabindex^="-"])',
].join(',');

export function buildActivity({
	mountPoint,
	component,
	isActive,
}: {
	mountPoint: HTMLElement;
	component: Component<{activityId: string}>;
	isActive: Accessor<boolean>;
}): Activity {
	const activityId = createUniqueId();

	const container = document.createElement('div');
	container.setAttribute('class', 'screen-mount-point');
	container.tabIndex = -1;
	mountPoint.appendChild(container);
	container.addEventListener('keydown', (e) => {
		untrack(() => {
			if (!isActive()) {
				return;
			}
			if (e.key === 'Tab') {
				const allFocusable = container.querySelectorAll(focusableSelector);
				const firstFocusable = allFocusable[0] ?? container;
				const lastFocusable = allFocusable[allFocusable.length - 1] ?? container;
				const active = document.activeElement;
				if (!e.shiftKey && active === lastFocusable) {
					e.preventDefault();
					(firstFocusable as HTMLElement | undefined)?.focus({preventScroll: true});
				} else if (e.shiftKey && active === firstFocusable) {
					e.preventDefault();
					(lastFocusable as HTMLElement | undefined)?.focus({preventScroll: true});
				}
			}
		});
	});

	const activity: Activity = {
		dispose: noop,
		id: activityId,
		callbacks: {},
		isActive,
		focus: () =>
			container.focus({
				preventScroll: true,
			}),
		root: container,
		render: () => {
			const solidDispose = render(() => component({activityId}), container);
			activity.dispose = () => {
				solidDispose();
				activity.dispose = noop;
				mountPoint.removeChild(container);
			};
			activity.render = noop;
		},
	};

	return activity;
}

export function makeLifecycleHooks(activityFinder: () => Activity): {
	useAfterPause: (cb: () => MaybePromise<void>) => void;
	useBeforePause: (cb: () => MaybePromise<void>) => void;
	useAfterResume: (cb: () => MaybePromise<void>) => void;
	useBeforeResume: (cb: () => MaybePromise<void>) => void;
} {
	function useLifecycleCallback(
		cb: () => MaybePromise<void>,
		type: 'onBeforePauseCbs' | 'onBeforeResumeCbs' | 'onAfterPauseCbs' | 'onAfterResumeCbs',
	) {
		const activity = activityFinder();
		if (!activity.callbacks[type]) {
			activity.callbacks[type] = [];
		}
		activity.callbacks[type]!.push(cb);
	}

	function useBeforePause(cb: () => MaybePromise<void>): void {
		useLifecycleCallback(cb, 'onBeforePauseCbs');
	}
	function useBeforeResume(cb: () => MaybePromise<void>): void {
		useLifecycleCallback(cb, 'onBeforeResumeCbs');
	}

	function useAfterPause(cb: () => MaybePromise<void>): void {
		useLifecycleCallback(cb, 'onAfterPauseCbs');
	}
	function useAfterResume(cb: () => MaybePromise<void>): void {
		useLifecycleCallback(cb, 'onAfterResumeCbs');
	}

	return {
		useAfterPause,
		useBeforePause,
		useAfterResume,
		useBeforeResume,
	};
}
