import {Show} from 'solid-js';
import type {JSXElement} from 'solid-js';
import {AnimatedTabScreen} from './AnimatedTabScreen';
import {ScrollArea, safeAreaPaddingStyles} from '../components';
import type {AriaAttributesProps, DataAttributesProps} from '../solid-extra';
import {splitPropsAriaProps, splitPropsDataProps, type AppearanceProps} from '../solid-extra';

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
				<div class="shadow py-3 text-xl relative z-10" style={safeAreaPaddingStyles.horizontal}>
					<div
						classList={{
							'flex items-center px-3': true,
						}}
					>
						{props.title}
					</div>
				</div>
			</Show>
			<ScrollArea
				class={props.scrollAreaAppearance?.class}
				classList={props.scrollAreaAppearance?.classList}
				style={{
					'z-index': 0,
					position: 'relative',
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
