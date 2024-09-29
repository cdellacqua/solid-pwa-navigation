import {createSignal, type JSXElement} from 'solid-js';
import {Screen} from '../components';
import {clamp, mapBetweenRanges} from '../utils';
import {useStackRouter} from '../routers';
import type {AriaAttributesProps, DataAttributesProps} from '../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../solid-extra';
import {useDraggable} from '../gestures';

export type AnimatedStackScreenProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		children: JSXElement;
		outro?: 'translateX' | 'translateZ';
		/** @default true */
		draggable?: boolean;
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
		} else
			switch (props.outro ?? 'translateX') {
				case 'translateX':
					return `translateX(${-100 * outRatio()}px)`;
				case 'translateZ':
					return `translateZ(${-50 * outRatio()}px) translateY(${outRatio() * 15}px) rotateX(${-outRatio() * 2}deg)`;
			}
	};
	const [screenRef, setScreenRef] = createSignal<HTMLDivElement | null>(null);

	const disabled = () => !isActive() || activityStackIndex === 0 || busy() || !(props.draggable ?? true);
	const {dragging} = useDraggable({
		draggableEl: screenRef,
		disabled,
		filter({initialCoords}) {
			return initialCoords.x <= 10;
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
