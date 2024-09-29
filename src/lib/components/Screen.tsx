import type {AppearanceProps} from '../solid-extra/appearance';
import type {JSX, JSXElement} from 'solid-js';
import {splitProps} from 'solid-js';
import type {RefProps} from '../solid-extra';

export type ScreenProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> &
	AppearanceProps &
	RefProps<HTMLDivElement> & {
		children?: JSXElement;
	};

export const screenBackgroundCSSVar = 'var(--solid-pwa-navigation-view-bg, #fafafa)';

export function Screen(props_: ScreenProps): JSXElement {
	const [props, forwardProps] = splitProps(props_, ['style']);
	return (
		<div
			style={{
				position: 'absolute',
				'z-index': 0,
				display: 'flex',
				'flex-direction': 'column',
				flex: 1,
				'min-height': 0,
				inset: 0,
				overflow: 'hidden',
				outline: 'none',
				background: screenBackgroundCSSVar,
				...props.style,
			}}
			{...forwardProps}
		/>
	);
}
