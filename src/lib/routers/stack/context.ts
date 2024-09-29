import type {Accessor, Component, Setter} from 'solid-js';
import {createContext} from 'solid-js';
import type {MaybeArray} from '../../utils';
import type {Activity} from '../activity';
import type {SpringStore} from '@universal-stores/spring';

export type StackRouterContextContent = {
	push(component: MaybeArray<Component<void>>): Promise<void>;
	pop(opts?: {returnValue?: unknown; count?: number}): Promise<void>;
	activities: Accessor<Activity[]>;
	busy: Accessor<boolean>;
	continuousStackIndex: Accessor<number>;
	setContinuousStackIndex: Setter<number>;
	spring$: SpringStore<number>;
};

export type ActivityStackRouterContextContent = StackRouterContextContent & {
	activityId: string;
};

export const StackRouterContext = createContext<ActivityStackRouterContextContent | null>(null);
