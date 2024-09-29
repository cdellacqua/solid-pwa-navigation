export function splitPropsByPrefix<T, Prefix extends string>(
	props: T,
	prefix: Prefix,
): [Pick<T, keyof T & `${Prefix}${string}`>, Exclude<T, keyof T & `${Prefix}${string}`>] {
	const descriptors = Object.getOwnPropertyDescriptors(props);
	const keys = Object.keys(descriptors);

	const matchPrefix: Partial<T> = {};
	const rest: Partial<T> = {};
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (descriptors[key]) {
			if (key.startsWith(prefix)) {
				Object.defineProperty(matchPrefix, key, descriptors[key]);
			} else {
				Object.defineProperty(rest, key, descriptors[key]);
			}
		}
	}
	return [matchPrefix, rest] as [Pick<T, keyof T & `${Prefix}${string}`>, Exclude<T, keyof T & `${Prefix}${string}`>];
}

export type DataAttributesProps = Record<`data-${string}`, string | number | boolean>;
export type AriaAttributesProps = Record<`aria-${string}`, string | number | boolean>;

export function splitPropsAriaProps<T>(
	props: T,
): [Pick<T, keyof T & keyof AriaAttributesProps>, Exclude<T, keyof T & keyof AriaAttributesProps>] {
	return splitPropsByPrefix(props, 'aria-');
}

export function splitPropsDataProps<T>(
	props: T,
): [Pick<T, keyof T & keyof DataAttributesProps>, Exclude<T, keyof T & keyof DataAttributesProps>] {
	return splitPropsByPrefix(props, 'data-');
}
