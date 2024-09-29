/* import {cleanup, render} from 'solid-testing-library';
import {createSignal} from 'solid-js';

describe('examples', () => {
	afterEach(cleanup);

	it('example', () => {
		function Counter() {
			const [count] = createSignal(0);
			return (
				<>
					<h1>{count()}</h1>
				</>
			);
		}

		render(() => <Counter />);

		expect(document.querySelector('h1')?.textContent).toBe('0');
	});
});
 */
