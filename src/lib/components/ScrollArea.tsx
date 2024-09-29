import type {JSX, JSXElement} from 'solid-js';
import {splitProps} from 'solid-js';
import {mergeProps} from 'solid-js';
import type {RefProps} from '../solid-extra';
import type {AppearanceProps} from '../solid-extra';

export type ScrollAreaProps = AppearanceProps &
	Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> &
	RefProps<HTMLDivElement> & {
		children?: JSXElement;
		direction?: 'horizontal' | 'vertical';
	};

export function ScrollArea(props_: ScrollAreaProps): JSXElement {
	const merged = mergeProps({direction: 'vertical'} as const, props_);
	const [props, forwardProps] = splitProps(merged, ['style', 'class', 'classList', 'direction', 'ref', 'children']);

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				...(props.direction === 'vertical'
					? {
							'flex-direction': 'column',
							'min-height': 0,
							'overflow-y': 'auto',
							'overflow-x': 'hidden',
					  }
					: {
							'flex-direction': 'row',
							'min-width': 0,
							'overflow-x': 'auto',
							'overflow-y': 'hidden',
					  }),
				...props.style,
			}}
			class={props.class}
			classList={{'webkit-scroll-hack': true, ...props.classList}}
			ref={props.ref}
			{...forwardProps}
		>
			<div
				style={{
					display: 'flex',
					flex: 1,
					...(props.direction === 'vertical'
						? {
								'flex-direction': 'column',
								height: 'min-content',
						  }
						: {
								'flex-direction': 'row',
								width: 'min-content',
						  }),
				}}
			>
				{props.children}
			</div>
		</div>
	);
}
