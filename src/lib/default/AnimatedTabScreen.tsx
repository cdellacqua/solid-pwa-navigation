import {createSignal, type JSXElement} from 'solid-js';
import {Screen} from '../components';
import {clamp, mapBetweenRanges} from '../utils';
import {useTabRouter} from '../routers';
import {
	splitPropsAriaProps,
	splitPropsDataProps,
	type AppearanceProps,
	type AriaAttributesProps,
	type DataAttributesProps,
} from '../solid-extra';
import {useDraggable} from '../gestures';

export type AnimatedTabScreenProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		children: JSXElement;
		/** @default true */
		draggable?: boolean;
	};

export function AnimatedTabScreen(props: AnimatedTabScreenProps): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);
	const {
		continuousTabIndex,
		activityTabIndex,
		isActive,
		busy,
		setOutRatio,
		outRatio,
		resetOutRatio,
		goToTab,
		tabNames,
	} = useTabRouter();
	const translateXRatio = () => clamp(activityTabIndex() - continuousTabIndex(), -1, 1);
	const [screenRef, setScreenRef] = createSignal<HTMLDivElement | null>(null);

	const disabled = () => !isActive() || busy() || !(props.draggable ?? true);
	const {dragging} = useDraggable({
		draggableEl: screenRef,
		disabled,
		filter({initialCoords}) {
			return initialCoords.x <= 10 || initialCoords.x >= window.innerWidth - 10;
		},
		onDragMove({initialCoords, coords}) {
			setOutRatio(clamp(mapBetweenRanges(coords.x - initialCoords.x, 0, window.innerWidth, 0, 1), -1, 1));
		},
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		onDragEnd: async ({velocity}) => {
			if (activityTabIndex() > 0 && (outRatio() > 0.5 || velocity.x > 100)) {
				await goToTab(tabNames()[activityTabIndex() - 1]);
			} else if (activityTabIndex() < tabNames().length - 1 && (outRatio() < -0.5 || velocity.x < -100)) {
				await goToTab(tabNames()[activityTabIndex() + 1]);
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
			<Screen
				ref={setScreenRef}
				style={{
					transform: `translateX(${100 * translateXRatio()}%)`,
					opacity: 1 - Math.abs(translateXRatio()) / 2,
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
