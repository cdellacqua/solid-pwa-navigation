import {useEventListener} from '../solid-extra/event-listener';
import {type MaybeAccessor} from '../solid-extra/reactivity';

export function useBackKeyNavigation(listener: () => void, disabled?: MaybeAccessor<boolean>): void {
	useEventListener(
		document,
		'keydown',
		(e) => {
			if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.key === 'ArrowLeft') {
				e.preventDefault();
				e.stopPropagation();
				listener();
			}
		},
		undefined,
		disabled,
	);
}

export function useHistoryPopStateListener(listener: () => void, disabled?: MaybeAccessor<boolean>): void {
	useEventListener(window, 'popstate', listener, undefined, disabled);
}
