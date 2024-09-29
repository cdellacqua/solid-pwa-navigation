import type {Accessor, Owner} from 'solid-js';
import {runWithOwner} from 'solid-js';

export type MaybeAccessor<T> = Accessor<T> | T;

export function access<T>(value: MaybeAccessor<T>, owner?: Owner | null): T {
	return typeof value === 'function'
		? owner
			? (runWithOwner(owner, value as Accessor<T>) as T)
			: (value as Accessor<T>)()
		: value;
}

export function track(...value: Array<MaybeAccessor<any>>): void {
	value.forEach((v) => access(v));
}

export type SimpleSetter<T> = (x: T) => void;
