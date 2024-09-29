import './lib/style.css';
import {render} from 'solid-js/web';
import type {JSX, JSXElement} from 'solid-js';
import {For, Show, createSignal} from 'solid-js';
import type {TabRouterContextContent} from './lib/routers';
import {TabRouter} from './lib/routers';
import {TabPage} from './lib/default/TabPage';
import {clamp, unpromisify} from './lib/utils';

export type PageProps = {
	children?: JSXElement;
	title?: JSXElement;
	style?: JSX.CSSProperties;
};

type Product = {name: string; description: string; image: string; extendedDescription: string};

const products = {
	solid: {
		name: 'SolidJS',
		description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
		image: './solid.svg',
		extendedDescription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
	},
	react: {
		name: 'React',
		description: 'The library for web and native user interfaces',
		image: './react.svg',
		extendedDescription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
	},
	svelte: {
		name: 'Svelte',
		description: 'Cybernetically enhanced web apps',
		image: './svelte.svg',
		extendedDescription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
	},
	angular: {
		name: 'Angular',
		description: 'The modern web developer’s platform',
		image: './angular.svg',
		extendedDescription:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
	},
} as const;

function ProductDetails(props: {product: Product}) {
	return (
		<TabPage title={props.product.name}>
			<div class="px-2 pt-4">{props.product.description}</div>
		</TabPage>
	);
}

function App() {
	const [tabCtx, setTabCtx] = createSignal<TabRouterContextContent<keyof typeof products> | null>(null);
	return (
		<div class="absolute inset-0 z-0">
			<div class="absolute inset-0 z-0">
				<TabRouter
					tabs={
						{
							solid: () => <ProductDetails product={products.solid} />,
							angular: () => <ProductDetails product={products.angular} />,
							react: () => <ProductDetails product={products.react} />,
							svelte: () => <ProductDetails product={products.svelte} />,
						} satisfies Record<keyof typeof products, unknown>
					}
					initialTab={'solid'}
					ctxRef={setTabCtx}
				/>
				<Show when={tabCtx()} keyed>
					{({goToTab, tabNames, continuousTabIndex}) => (
						<For each={tabNames()}>
							{(tabName, i) => (
								<div class="absolute bottom-10 z-10 left-1/2 -translate-x-1/2">
									<button
										class="px-2 py-2 rounded-full bg-white shadow-md"
										onClick={unpromisify(() => goToTab(tabName))}
										type="button"
										style={{
											transform: `translateX(${(continuousTabIndex() - i()) * -72}px) scale(${clamp(
												1 - Math.abs(continuousTabIndex() - i()) * 0.33,
												0,
												1,
											)})`,
										}}
									>
										<img
											src={products[tabName].image}
											alt={products[tabName].name}
											class="w-12 h-12 max-w-none relative z-10"
										/>
									</button>
								</div>
							)}
						</For>
					)}
				</Show>
			</div>
		</div>
	);
}

render(() => <App />, document.getElementById('app')!);
