export type MaybePromise<T> = T | Promise<T>;

export function unpromisify<T extends (...args: any[]) => MaybePromise<void>>(fn: T): (...args: Parameters<T>) => void {
	return (...args) => {
		(async () => {
			await fn(...args);
		})().catch(console.warn);
	};
}
