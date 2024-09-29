export function maybeCall<TOrFn>(
	maybeFn: TOrFn,
	...params: TOrFn extends (...params: any[]) => any ? Parameters<TOrFn> : []
): TOrFn extends (...params: any[]) => any ? ReturnType<TOrFn> : TOrFn {
	if (typeof maybeFn === 'function') {
		return maybeFn(...params);
	}
	return maybeFn as any;
}
