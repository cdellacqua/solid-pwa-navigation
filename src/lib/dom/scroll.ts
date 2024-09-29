import type {Accessor} from 'solid-js';
import {createSignal, createRenderEffect} from 'solid-js';
import {useEventListener} from '../solid-extra/event-listener';
import type {Vec2D} from '../utils/math';
import type {MaybeAccessor} from '../solid-extra/reactivity';
import {access} from '../solid-extra/reactivity';

function getScroll(elementOrWindow: HTMLElement | Window): Vec2D {
	if ('scrollLeft' in elementOrWindow) {
		return {x: elementOrWindow.scrollLeft, y: elementOrWindow.scrollTop};
	}
	return {x: elementOrWindow.scrollX, y: elementOrWindow.scrollY};
}

export function useScroll(target: MaybeAccessor<HTMLElement | Window>, pause?: MaybeAccessor<boolean>): Accessor<Vec2D>;
export function useScroll(
	target: MaybeAccessor<HTMLElement | Window | null | undefined>,
	pause?: MaybeAccessor<boolean>,
): Accessor<Vec2D | null>;

export function useScroll(
	target: MaybeAccessor<HTMLElement | Window | null | undefined>,
	pause: MaybeAccessor<boolean> = false,
): Accessor<Vec2D | null> {
	const initialTarget = access(target);
	const [scroll, setScroll] = createSignal<Vec2D | null>(!initialTarget ? null : getScroll(initialTarget));

	const scrollUpdater = () => {
		const newTarget = access(target);
		if (!access(pause)) {
			setScroll(!newTarget ? null : getScroll(newTarget));
		}
	};

	createRenderEffect(scrollUpdater);
	useEventListener(target, 'scroll', scrollUpdater);

	return scroll;
}
