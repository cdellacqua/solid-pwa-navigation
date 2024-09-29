import type {Accessor, Component, Setter} from 'solid-js';
import {createContext} from 'solid-js';
import type {Activity} from '../activity';
import type {SpringStore} from '@universal-stores/spring';

export type Tab = {activity: Activity; component: Component<void>; index: number};

export type TabRouterContextContent<TabName extends string> = {
	goToTab(name: TabName, opts?: {returnValue?: unknown}): Promise<void>;
	tabs(): Partial<Record<TabName, Tab>>;
	tabNames(): TabName[];
	busy: Accessor<boolean>;
	continuousTabIndex: Accessor<number>;
	activeTabName: Accessor<TabName>;
	setContinuousTabIndex: Setter<number>;
	spring$: SpringStore<number>;
};

export type ActivityTabRouterContextContent<TabName extends string> = TabRouterContextContent<TabName> & {
	activityId: string;
	activityName: TabName;
};

export const TabRouterContext = createContext<ActivityTabRouterContextContent<string> | null>(null);
