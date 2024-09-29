import {createSignal, createEffect, createRenderEffect, onCleanup} from 'solid-js';
import {noop} from '../utils/runtime';
import {track} from './reactivity';

function tickHookFactory(effectHook: 'layout' | 'regular'): () => (params?: {signal?: AbortSignal}) => Promise<void> {
	return function useTickHook() {
		const [dummyState, setDummyState] = createSignal(0);
		let tickCtx: null | {promise: Promise<void>; resolve(): void; reject(err?: unknown): void} = null;
		const tick = async (params?: {signal?: AbortSignal}) => {
			params?.signal?.throwIfAborted();
			let promise: Promise<void>;
			if (tickCtx) {
				promise = tickCtx.promise;
			} else {
				let resolve = noop;
				let reject = noop;
				const abortListener = () => {
					reject(params?.signal?.reason);
				};
				promise = new Promise<void>((res, rej) => {
					resolve = () => {
						params?.signal?.removeEventListener('abort', abortListener);
						tickCtx = null;
						res();
					};
					reject = (err) => {
						tickCtx = null;
						rej(err);
					};
				});
				params?.signal?.addEventListener('abort', abortListener, {once: true});

				tickCtx = {resolve, reject, promise};
			}

			setDummyState((n) => n + 1);
			await promise;
		};
		const tickResolver = () => {
			track(dummyState);
			tickCtx?.resolve();
		};
		switch (effectHook) {
			case 'regular': {
				createEffect(tickResolver);
				break;
			}
			case 'layout': {
				createRenderEffect(tickResolver);
				break;
			}
		}
		onCleanup(() => {
			tickCtx?.resolve();
		});

		return tick;
	};
}

export const useTick = tickHookFactory('regular');
export const useLayoutTick = tickHookFactory('layout');
