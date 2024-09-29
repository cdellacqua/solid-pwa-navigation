import type {Rect2D, Vec2D} from './lib/utils/math';
import {mapRatio} from './lib/utils/math';
import './lib/style.css';
import {render} from 'solid-js/web';
import {Show, onMount} from 'solid-js';
import {For} from 'solid-js';
import {createSignal} from 'solid-js';
import {Clickable} from './lib/components';
import {unpromisify} from './lib/utils';
import {useStackRouter, StackRouter} from './lib/routers';
import {StackPage} from './lib/default/StackPage';
import {ModalStackScreen} from './lib/default/ModalStackScreen';
import type {TabRouterContextContent} from './lib/routers/tab';
import {TabRouter} from './lib/routers/tab';
import {safeAreaCSSVars} from './lib/components';
import {TabPage} from './lib/default';
import {useEventListener} from './lib/solid-extra';

type Product = {name: string; description: string; image: string; extendedDescription: string};

function repeat<T>(arr: Array<T>, count: number): T[] {
	const result = new Array(arr.length * count);
	let resultIndex = 0;
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < arr.length; j++) {
			result[resultIndex] = arr[j];
			resultIndex++;
		}
	}
	return result;
}

const products: Product[] = repeat(
	[
		{
			name: 'SolidJS',
			description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
			image: '/solid.svg',
			extendedDescription:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
		},
		{
			name: 'React',
			description: 'The library for web and native user interfaces',
			image: '/react.svg',
			extendedDescription:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
		},
		{
			name: 'Svelte',
			description: 'Cybernetically enhanced web apps',
			image: '/svelte.svg',
			extendedDescription:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
		},
		{
			name: 'Angular',
			description: 'The modern web developer’s platform',
			image: '/angular.svg',
			extendedDescription:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, rem ratione, at nulla quisquam quis ex ab dolores commodi numquam velit autem! Blanditiis, totam maiores. Dolore quia illo obcaecati autem!',
		},
	],
	10,
);

function ProductList(props: {title?: string}) {
	const {push, busy, activityStackIndex, continuousStackIndex} = useStackRouter();
	const refs: HTMLImageElement[] = [];
	const [selectedIndex, setSelectedIndex] = createSignal<number | null>(null);

	return (
		<StackPage title={props.title ?? 'Pick your framework'}>
			<div class="divide-y divide-[#cacaca] border-y border-[#cacaca] relative">
				<For each={products}>
					{(product, i) => (
						<Clickable
							disabled={busy()}
							onClick={unpromisify(() => {
								const initialRect = refs[i()].getBoundingClientRect();
								setSelectedIndex(i());
								return push(() => <ProductDetails product={product} initialRect={initialRect} />);
							})}
						>
							<div class="flex flex-row bg-gradient-to-b from-[#fafafa] to-[#f5f5f5]">
								<div class="p-2">
									<div class="p-4 relative z-0 w-16 h-16">
										<div class="rounded-full overflow-hidden border-red-200 border bg-white absolute z-0 inset-0" />
										<img
											ref={refs[i()]}
											src={product.image}
											alt={product.name}
											class="w-full h-full max-w-none relative z-10"
											style={{
												display: `${
													selectedIndex() === i() && continuousStackIndex() > activityStackIndex ? 'none' : ''
												}`,
											}}
										/>
									</div>
								</div>
								<div class="pt-3 px-2 pb-2">
									<div>
										<strong>{product.name}</strong>
									</div>
									<div>{product.description}</div>
								</div>
							</div>
						</Clickable>
					)}
				</For>
			</div>
		</StackPage>
	);
}

function ProductDetails(props: {product: Product; initialRect: Vec2D & Rect2D}) {
	const {push, busy, inRatio} = useStackRouter();
	let placeholderRef: HTMLDivElement | undefined;
	const [targetRect, setTargetRect] = createSignal<(Vec2D & Rect2D) | null>(null);
	onMount(() => {
		setTargetRect(placeholderRef!.getBoundingClientRect());
	});
	return (
		<div class="absolute inset-0 z-0">
			<img
				src={props.product.image}
				alt={props.product.name}
				style={{
					position: 'absolute',
					'z-index': 20,
					opacity: inRatio() === 1 ? 0 : 1,
					top: `${mapRatio(inRatio(), props.initialRect.y, targetRect()?.y ?? 0)}px`,
					left: `${mapRatio(inRatio(), props.initialRect.x, targetRect()?.x ?? 0)}px`,
					height: `${mapRatio(inRatio(), props.initialRect.height, targetRect()?.height ?? 0)}px`,
					width: `${mapRatio(inRatio(), props.initialRect.width, targetRect()?.width ?? 0)}px`,
				}}
			/>
			<StackPage
				title="Hello"
				style={
					targetRect()
						? {}
						: {
								visibility: 'hidden',
								transform: '',
						  }
				}
			>
				<div class="flex items-center p-4">
					<div class="p-4 relative z-0">
						<div
							style={{
								transform: `scale(${inRatio()})`,
							}}
							class="rounded-full overflow-hidden border-red-200 border bg-white absolute z-0 inset-0"
						/>
						<div class="p-2 relative z-10">
							<div ref={placeholderRef} class="w-32 h-32">
								<img
									src={props.product.image}
									alt={props.product.name}
									class="w-full h-full max-w-none"
									style={{
										opacity: inRatio() === 1 ? 1 : 0,
									}}
								/>
							</div>
						</div>
					</div>
					<div class="pl-8">
						<h1 class="font-bold text-3xl origin-left">{props.product.name}</h1>
					</div>
				</div>
				<div class="border-b border-gray-200 mx-8" />
				<div
					class="p-4"
					style={{
						transform: `translateX(${mapRatio(inRatio(), 800, 0)}px)`,
					}}
				>
					<div class="mb-1">
						<strong>Extended description</strong>
					</div>
					{props.product.extendedDescription}
					<div class="mt-10">
						<button type="button" disabled={busy()} onClick={unpromisify(() => push(() => <Share />))}>
							Share
						</button>
					</div>
				</div>
			</StackPage>
		</div>
	);
}

function Share() {
	const {pop, busy} = useStackRouter();
	return (
		<ModalStackScreen title="Hello">
			<strong>Share with your friends!</strong>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati
			perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore
			saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque,
			obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam
			totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque
			suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio
			officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
			iste atque suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam
			exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur
			adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae
			libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet,
			consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae harum eos
			repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor
			sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae
			harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem
			ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis
			recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe
			ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati
			perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore
			saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque,
			obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam
			totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque
			suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio
			officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
			iste atque suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam
			exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur
			adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae
			libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet,
			consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae harum eos
			repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor
			sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae
			harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem
			ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis
			recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe
			ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati
			perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore
			saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque suscipit, neque,
			obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio officia aliquam
			totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis iste atque
			suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam exercitationem optio
			officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
			iste atque suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae libero iusto ullam
			exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet, consectetur
			adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae harum eos repudiandae
			libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione. Lorem ipsum dolor sit amet,
			consectetur adipisicing elit. Corporis iste atque suscipit, neque, obcaecati perferendis recusandae harum eos
			repudiandae libero iusto ullam exercitationem optio officia aliquam totam dolore saepe ratione.
			<div class="mt-10">
				<button type="button" disabled={busy()} onClick={unpromisify(() => pop({count: 2}))}>
					Home
				</button>
			</div>
		</ModalStackScreen>
	);
}

function App() {
	const [coords, setCoords] = createSignal<Vec2D>({x: -100, y: -100});
	const [showTouch, setShowTouch] = createSignal(false);
	useEventListener(document.body, 'touchstart', (e) => {
		setCoords({x: e.touches[0].clientX, y: e.touches[0].clientY});
		setShowTouch(true);
	});
	useEventListener(document.body, 'touchmove', (e) => setCoords({x: e.touches[0].clientX, y: e.touches[0].clientY}), {
		capture: true,
	});
	useEventListener(document.body, 'touchend', () => {
		setShowTouch(false);
	});

	const [tabCtx, setTabCtx] = createSignal<TabRouterContextContent<'one' | 'two'> | null>(null);

	return (
		<div class="inset-0 absolute z-0">
			<TabRouter
				tabs={{
					one: () => (
						<TabPage>
							<StackRouter entryPoint={() => <ProductList title="Left" />} />
						</TabPage>
					),
					two: () => (
						<TabPage>
							<StackRouter entryPoint={() => <ProductList title="Right" />} />
						</TabPage>
					),
				}}
				initialTab="one"
				ctxRef={setTabCtx}
			/>
			<Show when={tabCtx()} keyed>
				{({continuousTabIndex, tabNames, goToTab}) => (
					<>
						<div
							class="bg-gray-300 w-12 h-12 rounded-full opacity-90 shadow z-10 absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
							style={{
								opacity: showTouch() ? 1 : 0,
								top: `${coords()!.y}px`,
								left: `${coords()!.x}px`,
								'pointer-events': 'none',
							}}
						/>
						<div
							class="absolute inset-x-0 h-14 pointer-events-none flex justify-center"
							style={{
								bottom: `max(${safeAreaCSSVars.bottom}, 1rem)`,
							}}
						>
							<div class="relative bg-black flex overflow-hidden rounded-full items-center shadow-lg">
								<div
									class="absolute pointer-events-none left-0 bg-white rounded-full overflow-hidden w-10 h-10 z-0"
									style={{
										'margin-left': '0.5rem',
										left: `calc(${continuousTabIndex()} * ((100% - 0.5rem) / ${tabNames().length}))`,
									}}
								/>
								<div class="relative z-10 pointer-events-auto flex space-x-2 justify-center items-center rounded-full py-1 px-2">
									<button
										class="w-10 uppercase text-sm"
										style={{
											color: `rgb(${mapRatio(continuousTabIndex(), 0, 255)}, ${mapRatio(
												continuousTabIndex(),
												0,
												255,
											)}, ${mapRatio(continuousTabIndex(), 0, 255)})`,
										}}
										type="button"
										onClick={() => void goToTab('one')}
									>
										A
									</button>
									<button
										class="w-10 uppercase text-sm"
										style={{
											color: `rgb(${mapRatio(continuousTabIndex(), 255, 0)}, ${mapRatio(
												continuousTabIndex(),
												255,
												0,
											)}, ${mapRatio(continuousTabIndex(), 255, 0)})`,
										}}
										type="button"
										onClick={() => void goToTab('two')}
									>
										B
									</button>
								</div>
							</div>
						</div>
					</>
				)}
			</Show>
		</div>
	);
}

render(() => <App />, document.getElementById('app')!);
