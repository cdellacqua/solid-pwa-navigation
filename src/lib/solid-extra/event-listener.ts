import {createRenderEffect, onCleanup, untrack} from 'solid-js';
import type {MaybeAccessor} from './reactivity';
import {access} from './reactivity';

export function useEventListener<Target extends HTMLElement, K extends keyof HTMLElementEventMap>(
	target: MaybeAccessor<Target | null | undefined>,
	name: K,
	callback: (e: HTMLElementEventMap[K]) => void,
	opts?: MaybeAccessor<AddEventListenerOptions | undefined>,
	disabled?: MaybeAccessor<boolean>,
): void;
export function useEventListener<Target extends Document, K extends keyof DocumentEventMap>(
	target: MaybeAccessor<Target | null | undefined>,
	name: K,
	callback: (e: DocumentEventMap[K]) => void,
	opts?: MaybeAccessor<AddEventListenerOptions | undefined>,
	disabled?: MaybeAccessor<boolean>,
): void;
export function useEventListener<Target extends Window, K extends keyof WindowEventMap>(
	target: MaybeAccessor<Target | null | undefined>,
	name: K,
	callback: (e: WindowEventMap[K]) => void,
	opts?: MaybeAccessor<AddEventListenerOptions | undefined>,
	disabled?: MaybeAccessor<boolean>,
): void;
export function useEventListener<
	Target extends HTMLElement | Document | Window,
	K extends keyof (HTMLElementEventMap | DocumentEventMap | WindowEventMap),
>(
	target: MaybeAccessor<Target | null | undefined>,
	name: K,
	callback: (e: (HTMLElementEventMap | DocumentEventMap | WindowEventMap)[K]) => void,
	opts?: MaybeAccessor<AddEventListenerOptions | undefined>,
	disabled?: MaybeAccessor<boolean>,
): void;

export function useEventListener<
	Target extends HTMLElement | Document | Window,
	K extends keyof (HTMLElementEventMap | DocumentEventMap | WindowEventMap),
>(
	target: MaybeAccessor<Target | null | undefined>,
	name: K,
	callback: (e: (HTMLElementEventMap | DocumentEventMap | WindowEventMap)[K]) => void,
	opts?: MaybeAccessor<AddEventListenerOptions | undefined>,
	disabled?: MaybeAccessor<boolean>,
): void {
	createRenderEffect(() => {
		const currentTarget = access(target);
		const currentOptions = {passive: false, ...access(opts)};
		const currentDisabled = access(disabled);
		if (!currentTarget || currentDisabled) {
			return;
		}
		const untrackedCallback = (e: Event) =>
			untrack(() => callback(e as (HTMLElementEventMap | DocumentEventMap | WindowEventMap)[K]));
		currentTarget.addEventListener(name, untrackedCallback, currentOptions);
		onCleanup(() => currentTarget.removeEventListener(name, untrackedCallback, currentOptions));
	});
}
