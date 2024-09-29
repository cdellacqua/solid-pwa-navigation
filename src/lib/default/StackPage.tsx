import type {JSXElement} from 'solid-js';
import {Show} from 'solid-js';
import {useStackRouter} from '../routers';
import {unpromisify} from '../utils';
import type {AnimatedStackScreenProps} from './AnimatedStackScreen';
import {AnimatedStackScreen} from './AnimatedStackScreen';
import {Clickable, ScrollArea, safeAreaPaddingStyles} from '../components';
import {ArrowLeft} from './ArrowLeft';
import type {AriaAttributesProps, DataAttributesProps} from '../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../solid-extra';
import {Failsafe} from '../solid-extra/failsafe';

export type StackPageProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps &
	AnimatedStackScreenProps & {
		children: JSXElement;
		title?: JSXElement;
		scrollAreaAppearance?: AppearanceProps;
	};

export function StackPage(props: StackPageProps): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);
	const {pop, activityStackIndex, busy} = useStackRouter();
	return (
		<AnimatedStackScreen
			style={{
				...safeAreaPaddingStyles.top,
				...props.style,
			}}
			class={props.class}
			classList={props.classList}
			outro={props.outro}
			{...data}
			{...aria}
		>
			<Show when={props.title}>
				<div class="shadow py-3 text-xl flex items-center" style={safeAreaPaddingStyles.horizontal}>
					<Clickable
						class="flex items-center px-3"
						disabled={busy() || activityStackIndex === 0}
						onClick={unpromisify(() => pop())}
					>
						<Show when={activityStackIndex > 0}>
							<button type="button" class="block pr-2.5">
								<ArrowLeft />
							</button>
						</Show>
						<Failsafe wrapper={(content) => <span class="truncate grow">{content()}</span>}>{props.title}</Failsafe>
					</Clickable>
				</div>
			</Show>
			<ScrollArea
				class={props.scrollAreaAppearance?.class}
				classList={props.scrollAreaAppearance?.classList}
				style={{
					...safeAreaPaddingStyles.bottom,
					...safeAreaPaddingStyles.horizontal,
					...props.scrollAreaAppearance?.style,
				}}
			>
				{props.children}
			</ScrollArea>
		</AnimatedStackScreen>
	);
}
