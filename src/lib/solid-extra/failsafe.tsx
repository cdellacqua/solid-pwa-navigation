import type {Accessor, JSXElement} from 'solid-js';
import {children, Show} from 'solid-js';
import type {Falsy} from '../utils';

export function Failsafe(props: {
	wrapper: (content: Accessor<string | number | Falsy>) => JSXElement;
	children: JSXElement;
}): JSXElement {
	const child = children(() => props.children);
	return (
		<Show when={!child() || typeof child() === 'string' || typeof child() === 'number'} fallback={<>{child()}</>}>
			{props.wrapper(child as Accessor<string | number | Falsy>)}
		</Show>
	);
}
