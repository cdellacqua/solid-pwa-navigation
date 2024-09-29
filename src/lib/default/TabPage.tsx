import {Show} from 'solid-js';
import type {JSXElement} from 'solid-js';
import {AnimatedTabScreen} from './AnimatedTabScreen';
import {ScrollArea, safeAreaPaddingStyles} from '../components';
import type {AriaAttributesProps, DataAttributesProps} from '../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../solid-extra';
import {Failsafe} from '../solid-extra/failsafe';

export type TabPageProps = AppearanceProps &
	DataAttributesProps &
	AriaAttributesProps & {
		children: JSXElement;
		title?: JSXElement;
		scrollAreaAppearance?: AppearanceProps;
	};

export function TabPage(props: TabPageProps): JSXElement {
	const [data] = splitPropsDataProps(props);
	const [aria] = splitPropsAriaProps(props);
	return (
		<AnimatedTabScreen
			style={{
				...safeAreaPaddingStyles.top,
				...props.style,
			}}
			class={props.class}
			classList={props.classList}
			{...data}
			{...aria}
		>
			<Show when={props.title}>
				<div class="shadow py-3 text-xl" style={safeAreaPaddingStyles.horizontal}>
					<div class="flex items-center px-3">
						<Failsafe wrapper={(content) => <span class="truncate grow">{content()}</span>}>{props.title}</Failsafe>
					</div>
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
		</AnimatedTabScreen>
	);
}
