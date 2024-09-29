/**
 * Return a new object containing the same keys of the input one, except from the ones specified in the exclusion
 * list.
 * @param source An object.
 * @param keys Keys to remove from the input object.
 */
export function omit<T extends Record<string, any>, K extends keyof T>(source: T, keys: Array<K>): Omit<T, K> {
	const result = {...source};
	for (const k of keys) {
		delete result[k];
	}
	return result as Omit<T, K>;
}
