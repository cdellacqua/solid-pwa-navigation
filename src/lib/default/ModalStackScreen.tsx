import type {JSXElement} from 'solid-js';
import {createSignal} from 'solid-js';
import {ScrollArea, safeAreaPaddingStyles, screenBackgroundCSSVar} from '../components';
import {useStackRouter} from '../routers';
import {clamp, mapBetweenRanges, unpromisify} from '../utils';
import {mapRatio} from '../utils';
import type {AppearanceProps, AriaAttributesProps, DataAttributesProps} from '../solid-extra';
import {Failsafe, splitPropsAriaProps, splitPropsDataProps, useEventListener} from '../solid-extra';
import {useDraggable} from '../gestures';
import {debounce} from '@cdellacqua/debounce';

export type ModalStackScreenProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		title?: JSXElement;
		children: JSXElement;
	};

export function ModalStackScreen(props: ModalStackScreenProps): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);
	const {pop, busy, inRatio, isActive, activityStackIndex, setOutRatio, outRatio, resetOutRatio} = useStackRouter();

	const [scrollAreaEl, setScrollAreaEl] = createSignal<HTMLDivElement | undefined>(undefined);
	let scrolling = false;
	const resetScrolling = debounce(() => (scrolling = false), 20);
	useEventListener(scrollAreaEl, 'scroll', () => {
		scrolling = true;
		resetScrolling(); // emulating scrollend event which is not widely supported at the moment
	});

	const disabled = () => !isActive() || activityStackIndex === 0 || busy();
	const {dragging} = useDraggable({
		draggableEl: window,
		disabled,
		filter() {
			const currScrollAreaEl = scrollAreaEl();
			return !scrolling && currScrollAreaEl !== undefined && currScrollAreaEl.scrollTop < 10;
		},
		preventDefault({initialCoords, coords}) {
			return !scrolling && coords.y > initialCoords.y;
		},
		onDragMove({initialCoords, coords}) {
			if (scrolling) return;
			setOutRatio(clamp(mapBetweenRanges(coords.y - initialCoords.y, 0, window.innerHeight, 0, 1), 0, 1));
		},
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		onDragEnd: async ({velocity}) => {
			if (scrolling) {
				await resetOutRatio();
				return;
			}
			if (outRatio() > 0.5 || velocity.y > 100) {
				await pop();
			} else {
				await resetOutRatio();
			}
		},
	});

	let skipBackdropPop = false;
	return (
		<div class="absolute inset-0 z-0" data-dragging={dragging()}>
			<div
				data-comment="backdrop"
				class="absolute z-0 bg-[#00000077] inset-0"
				style={{
					opacity: inRatio(),
				}}
				onMouseDown={() => (skipBackdropPop = false)}
				onTouchStart={() => (skipBackdropPop = false)}
				onMouseMove={() => (skipBackdropPop = true)}
				onTouchMove={() => (skipBackdropPop = true)}
				onClick={unpromisify(async () => {
					if (!skipBackdropPop && !busy() && inRatio() === 1) {
						await pop();
					}
				})}
			/>
			<div
				class="z-10 absolute inset-0 pointer-events-none"
				style={{
					transform: `translateY(${mapRatio(inRatio(), 100, 0)}%)`,
				}}
				{...data}
				{...aria}
			>
				<div
					class="absolute inset-x-0 bottom-0 top-10 pointer-events-auto flex"
					style={{
						'border-top-left-radius': '30px',
						'border-top-right-radius': '30px',
						overflow: 'hidden',
						background: screenBackgroundCSSVar,
						...safeAreaPaddingStyles.top,
					}}
				>
					<ScrollArea
						ref={setScrollAreaEl}
						style={{
							...safeAreaPaddingStyles.horizontal,
							...safeAreaPaddingStyles.bottom,
						}}
					>
						<div class="py-6 text-2xl flex items-center px-3">
							<Failsafe wrapper={(content) => <span class="truncate">{content()}</span>}>{props.title}</Failsafe>
						</div>
						<div class="px-3 flex flex-col grow">{props.children}</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
