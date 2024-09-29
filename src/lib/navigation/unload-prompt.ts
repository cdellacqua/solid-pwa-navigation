import type {MaybeAccessor} from '../solid-extra/reactivity';
import {useEventListener} from '../solid-extra/event-listener';

export function useBeforeUnloadConfirmationPrompt({disabled = false}: {disabled?: MaybeAccessor<boolean>}): void {
	useEventListener(
		window,
		'beforeunload',
		(e) => {
			e.returnValue = ' ';
			return ' ';
		},
		undefined,
		disabled,
	);
}
