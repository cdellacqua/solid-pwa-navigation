import type {JSXElement} from 'solid-js';
import {splitProps} from 'solid-js';
import type {ScreenProps} from './Screen';
import {Screen} from './Screen';

export type SafeAreaScreenProps = ScreenProps;

export const safeAreaCSSVars = {
	top: 'var(--safe-area-inset-top, 0px)',
	bottom: 'var(--safe-area-inset-bottom, 0px)',
	right: 'var(--safe-area-inset-right, 0px)',
	left: 'var(--safe-area-inset-left, 0px)',
};

export const safeAreaPaddingStyles = {
	all: {
		'padding-top': safeAreaCSSVars.top,
		'padding-bottom': safeAreaCSSVars.bottom,
		'padding-right': safeAreaCSSVars.right,
		'padding-left': safeAreaCSSVars.left,
	},
	horizontal: {
		'padding-right': safeAreaCSSVars.right,
		'padding-left': safeAreaCSSVars.left,
	},
	left: {
		'padding-left': safeAreaCSSVars.left,
	},
	right: {
		'padding-right': safeAreaCSSVars.right,
	},
	vertical: {
		'padding-top': safeAreaCSSVars.top,
		'padding-bottom': safeAreaCSSVars.bottom,
	},
	top: {
		'padding-top': safeAreaCSSVars.top,
	},
	bottom: {
		'padding-bottom': safeAreaCSSVars.bottom,
	},
};

export function SafeAreaScreen(props_: SafeAreaScreenProps): JSXElement {
	const [props, forwardProps] = splitProps(props_, ['style']);
	return (
		<Screen
			style={{
				...safeAreaPaddingStyles.all,
				...props.style,
			}}
			{...forwardProps}
		/>
	);
}
