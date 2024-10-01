import {createSignal, type JSXElement} from 'solid-js';
import {Screen} from '../components';
import {clamp, mapBetweenRanges} from '../utils';
import {useStackRouter} from '../routers';
import type {AriaAttributesProps, DataAttributesProps} from '../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../solid-extra';
import {useDraggable} from '../gestures';
import {draggableAreaSize} from './thresholds';

export type AnimatedStackScreenProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		children: JSXElement;
		outro?: 'translateX' | 'translateZ';
		/** @default true */
		draggable?: boolean;
		/** @default draggableAreaSize */
		draggableAreaSize?: number;
	};

export function AnimatedStackScreen(props: AnimatedStackScreenProps): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);

	const {continuousStackIndex, activityStackIndex, setOutRatio, inRatio, outRatio, resetOutRatio, pop, isActive, busy} =
		useStackRouter();

	const transform = () => {
		if (continuousStackIndex() <= activityStackIndex) {
			// Intro
			return `translateX(${100 * (1 - inRatio())}%)`;
		} else {
			const ratio = continuousStackIndex() - activityStackIndex;
			switch (props.outro ?? 'translateX') {
				case 'translateX':
					return `translateX(${-100 * ratio}px)`;
				case 'translateZ':
					return `translateZ(${-50 * ratio}px) translateY(${ratio * 15}px) rotateX(${-ratio * 2}deg)`;
			}
		}
	};
	const [screenRef, setScreenRef] = createSignal<HTMLDivElement | null>(null);

	const disabled = () => !isActive() || activityStackIndex === 0 || busy() || !(props.draggable ?? true);
	const {dragging} = useDraggable({
		draggableEl: screenRef,
		disabled,
		filter({initialCoords}) {
			return initialCoords.x <= (props.draggableAreaSize ?? draggableAreaSize);
		},
		onDragMove({initialCoords, coords}) {
			setOutRatio(clamp(mapBetweenRanges(coords.x - initialCoords.x, 0, window.innerWidth, 0, 1), 0, 1));
		},
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		onDragEnd: async ({velocity}) => {
			if (outRatio() > 0.5 || velocity.x > 100) {
				await pop();
			} else {
				await resetOutRatio();
			}
		},
	});

	return (
		<div
			class="absolute inset-0 z-0"
			style={{
				perspective: '1000px',
				'perspective-origin': 'top',
			}}
			data-dragging={dragging()}
		>
			<div
				class="absolute z-0 bg-[#00000077] inset-0"
				style={{
					opacity: inRatio(),
				}}
			/>
			<Screen
				ref={setScreenRef}
				style={{
					transform: transform(),
					...props.style,
				}}
				class={props.class}
				classList={props.classList}
				{...data}
				{...aria}
			>
				{props.children}
			</Screen>
		</div>
	);
}
