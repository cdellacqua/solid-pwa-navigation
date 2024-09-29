import type {Accessor} from 'solid-js';
import {createSignal, createRenderEffect, onCleanup} from 'solid-js';
import type {Rect2D} from '../utils/math';
import type {MaybeAccessor} from '../solid-extra/reactivity';
import {access} from '../solid-extra/reactivity';

export function useSize(
	target: MaybeAccessor<HTMLElement>,
	opts?: {
		pause?: boolean;
		onChange?(size: Rect2D): void;
	},
): Accessor<Rect2D>;
export function useSize(
	target: MaybeAccessor<HTMLElement | null | undefined>,
	opts?: {
		pause?: boolean;
		onChange?(size: Rect2D | null): void;
	},
): Accessor<Rect2D | null>;

export function useSize(
	target: MaybeAccessor<HTMLElement | null | undefined>,
	opts?: {
		pause?: MaybeAccessor<boolean>;
		onChange?(size: Rect2D | null): void;
	},
): Accessor<Rect2D | null> {
	const [size, _setSize] = createSignal<Rect2D | null>(access(target)?.getBoundingClientRect() ?? null);
	const setSize = (newSize: Rect2D | null) => {
		_setSize(newSize);
		opts?.onChange?.(newSize);
	};

	const resizeObserver = new ResizeObserver(([entry]) => {
		if (!access(opts?.pause) && entry) {
			setSize({
				height: entry.borderBoxSize[0].blockSize,
				width: entry.borderBoxSize[0].inlineSize,
			});
		}
	});

	createRenderEffect(() => {
		const newTarget = access(target);
		if (newTarget) {
			resizeObserver.observe(newTarget);
		}
		onCleanup(() => resizeObserver.disconnect());
	});

	createRenderEffect(() => {
		const newTarget = access(target);
		if (!access(opts?.pause)) {
			setSize(newTarget?.getBoundingClientRect() ?? null);
		}
	});

	return size;
}
