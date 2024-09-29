export type MaybeArray<T> = T | T[];

export function alwaysArray<T>(maybeArr: MaybeArray<T>): T[] {
	return Array.isArray(maybeArr) ? maybeArr : [maybeArr];
}

export function find<T>(
	arr: ArrayLike<T>,
	predicate: (item: T, index: number, arr: ArrayLike<T>) => boolean,
): T | undefined {
	for (let i = 0; i < arr.length; i++) {
		if (predicate(arr[i], i, arr)) {
			return arr[i];
		}
	}
	return undefined;
}

export function findIndex<T>(
	arr: ArrayLike<T>,
	predicate: (item: T, index: number, arr: ArrayLike<T>) => boolean,
): number | undefined {
	for (let i = 0; i < arr.length; i++) {
		if (predicate(arr[i], i, arr)) {
			return i;
		}
	}
	return undefined;
}

export const emptyArray = [] as const;
