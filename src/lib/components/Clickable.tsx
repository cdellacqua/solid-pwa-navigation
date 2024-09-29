import {splitProps, type JSX, type JSXElement} from 'solid-js';
import type {AppearanceProps, RefProps} from '../solid-extra';

export type ClickableProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style' | 'onclick' | 'onKeyDown' | 'onkeydown'> &
	AppearanceProps &
	RefProps<HTMLDivElement> & {
		disabled?: boolean;
		onClick?(e: MouseEvent): void;
	};

export function Clickable(props_: ClickableProps): JSXElement {
	const [props, forwardProps] = splitProps(props_, ['onClick', 'disabled']);

	return (
		<div
			role="button"
			tabIndex={props.disabled ? undefined : 0}
			onKeyDown={(e) => {
				if (!props.disabled && props.onClick && (e.key === 'Enter' || e.key === ' ')) {
					e.preventDefault();
					e.currentTarget.click();
				}
			}}
			onClick={(e) => !props.disabled && props.onClick?.(e)}
			{...forwardProps}
		/>
	);
}
