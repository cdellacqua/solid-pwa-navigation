import type {MaybeAccessor} from '../solid-extra/reactivity';
import {access} from '../solid-extra/reactivity';
import {find, Vec2DMath} from '../utils';
import type {Vec2D} from '../utils/math';
import type {Accessor} from 'solid-js';
import {createSignal} from 'solid-js';
import {maybeCall} from '../utils/functions';
import {useEventListener} from '../solid-extra';

type NativeEventData = {preventDefault(): void; stopPropagation(): void};

type DraggableIdleState = {
	type: 'idle';
	initialCoords?: undefined;
	touchId?: undefined;
};
type DraggableDraggingState = {
	type: 'dragging';
	initialCoords: Vec2D;
	touchId?: string | number;
};

export type NarrowedTouchEvent = {
	type: string;
	touches: ArrayLike<{clientX: number; clientY: number; identifier: string | number}>;
	changedTouches: ArrayLike<{clientX: number; clientY: number; identifier: string | number}>;
};

export type NarrowedMouseDownEvent = {
	clientX: number;
	clientY: number;
};

type DraggableState = DraggableIdleState | DraggableDraggingState;

export type UseDraggableParams = {
	onDragEnd?(params: {initialCoords: Vec2D; coords: Vec2D; velocity: Vec2D}): void;
	onDragMove?(params: {initialCoords: Vec2D; coords: Vec2D; velocity: Vec2D}): void;
	onDragStart?(params: {initialCoords: Vec2D}): void;
	filter?(params: {initialCoords: Vec2D}): boolean;
	disabled?: MaybeAccessor<boolean>;
	preventDefault?: boolean | ((params: {initialCoords: Vec2D; coords: Vec2D}) => boolean);
	stopPropagation?: boolean | ((params: {initialCoords: Vec2D; coords: Vec2D}) => boolean);
	draggableEl: MaybeAccessor<HTMLElement | Window | Document | null | undefined>;
};

function coordsFromMouseEvent(e: NarrowedMouseDownEvent): Vec2D {
	return {x: e.clientX, y: e.clientY};
}
function coordsFromTouchEvent(e: NarrowedTouchEvent, id: string | number): Vec2D {
	const candidate =
		e.type === 'touchstart'
			? find(e.touches, (touch) => touch.identifier === id)
			: find(e.changedTouches, (touch) => touch.identifier === id);
	if (!candidate) {
		throw new Error('invalid touch identifier');
	}
	return {x: candidate.clientX, y: candidate.clientY};
}

export type UseDraggableResult = {
	dragging: Accessor<boolean>;
	velocity: Accessor<Vec2D>;
};

/**
 * A hook that provides event listeners for a dragging operation.
 *
 * @param props {@link UseDraggableParams}
 */
export function useDraggable({
	onDragEnd,
	onDragMove,
	onDragStart,
	filter,
	preventDefault = true,
	stopPropagation = true,
	disabled = false,
	draggableEl,
}: UseDraggableParams): UseDraggableResult {
	let state: DraggableState = {type: 'idle'};
	const [dragging, setDragging] = createSignal(false);
	const [velocity, setVelocity] = createSignal<Vec2D>({x: 0, y: 0});

	const handleEventModifiers = (e: NativeEventData, initialCoords: Vec2D, coords: Vec2D) => {
		if (maybeCall(preventDefault, {initialCoords, coords})) {
			e.preventDefault();
		}
		if (maybeCall(stopPropagation, {initialCoords, coords})) {
			e.stopPropagation();
		}
	};

	let prevTranslationData: {coords: Vec2D; timestamp: number} | null = null;
	const handleStart = function (e: NativeEventData, getCoords: () => Vec2D) {
		const coords = getCoords();

		if (filter && !filter({initialCoords: coords})) {
			return;
		}

		handleEventModifiers(e, coords, coords);
		state = {type: 'dragging', initialCoords: coords};
		prevTranslationData = {coords, timestamp: performance.now()};
		onDragStart?.({initialCoords: coords});
	};
	const handleMove = function (e: NativeEventData, getCoords: () => Vec2D) {
		if (state.type !== 'dragging') {
			return;
		}
		const coords = getCoords();
		const now = performance.now();
		setVelocity(
			Vec2DMath.scale(
				1 / ((now - prevTranslationData!.timestamp) / 1000),
				Vec2DMath.sub(coords, prevTranslationData!.coords),
			),
		);

		handleEventModifiers(e, state.initialCoords, coords);

		setDragging(true);
		onDragMove?.({
			coords: coords,
			initialCoords: state.initialCoords,
			velocity: velocity(),
		});
	};
	const handleEnd = function (e: NativeEventData, getCoords: () => Vec2D) {
		if (state.type !== 'dragging') {
			return;
		}

		const coords = getCoords();
		handleEventModifiers(e, state.initialCoords, coords);

		if (prevTranslationData) {
			const now = performance.now();
			const decayFactor = now - prevTranslationData.timestamp;
			if (decayFactor > 0) {
				setVelocity(Vec2DMath.scale(1 / (1 + Math.exp(decayFactor / 1000)), velocity()));
			}
		}

		onDragEnd?.({
			coords: coords,
			initialCoords: state.initialCoords,
			velocity: velocity(),
		});

		state = {type: 'idle'};
		setDragging(false);
	};

	const onMouseDown = (e: MouseEvent) => {
		if (e.button !== 0) {
			return;
		}
		handleStart(e, () => coordsFromMouseEvent(e));
	};
	const onTouchStart = (e: NarrowedTouchEvent & NativeEventData) => {
		if (e.touches.length !== 1) {
			return;
		}
		handleStart(e, () => coordsFromTouchEvent(e, e.touches[0].identifier));
		state.touchId = e.touches[0].identifier;
	};
	const onDocumentMouseUp = (e: NarrowedMouseDownEvent & NativeEventData) => {
		handleEnd(e, () => coordsFromMouseEvent(e));
	};
	const onDocumentTouchEnd = (e: NarrowedTouchEvent & NativeEventData) => {
		if (state.touchId === undefined) {
			return;
		}
		handleEnd(e, () => coordsFromTouchEvent(e, state.touchId!));
	};
	const onDocumentMouseMove = (e: NarrowedMouseDownEvent & NativeEventData) => {
		handleMove(e, () => coordsFromMouseEvent(e));
	};
	const onDocumentTouchMove = (e: NarrowedTouchEvent & NativeEventData) => {
		if (state.touchId === undefined) {
			return;
		}
		handleMove(e, () => coordsFromTouchEvent(e, state.touchId!));
	};

	const disabled2 = () => access(disabled) || !access(draggableEl);
	useEventListener(draggableEl, 'mousedown', onMouseDown, undefined, disabled2);
	useEventListener(draggableEl, 'touchstart', onTouchStart, undefined, disabled2);
	useEventListener(document, 'mousemove', onDocumentMouseMove, undefined, disabled2);
	useEventListener(document, 'mouseup', onDocumentMouseUp, undefined, disabled2);
	// Ok, this is kinda weird, but the mouseup event is not dispatched when dragging a text selection around, so
	// as a workaround we can listen for dragend events.
	useEventListener(document, 'dragend', onDocumentMouseUp, undefined, disabled2);
	useEventListener(document, 'touchmove', onDocumentTouchMove, undefined, disabled2);
	useEventListener(document, 'touchend', onDocumentTouchEnd, undefined, disabled2);
	useEventListener(document, 'touchcancel', onDocumentTouchEnd, undefined, disabled2);

	return {
		dragging,
		velocity,
	};
}
