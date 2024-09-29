import type {JSX} from 'solid-js/jsx-runtime';

export type AppearanceProps = {
	style?: JSX.CSSProperties;
	class?: string;
	classList?: {
		[k: string]: boolean | undefined;
	};
};
