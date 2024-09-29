import {defineConfig} from 'vite';
import {readFileSync} from 'fs';
import {basename, dirname, join} from 'path';
import solidPlugin from 'vite-plugin-solid';

const {devDependencies, peerDependencies, exports} = JSON.parse(readFileSync('package.json').toString());

const entries = Object.fromEntries(
	Object.entries(exports)
		.filter(([, value]) => typeof value === 'object' && value.import && value.require)
		.map(([, {import: file}]) => basename(dirname(file)))
		.map((moduleName) => [moduleName, join('src', 'lib', moduleName)]),
);

export default defineConfig({
	plugins: [solidPlugin()],
	publicDir: false,
	build: {
		sourcemap: true,
		lib: {
			entry: entries,
			formats: ['cjs', 'es'],
			fileName: (format, entryName) => join(entryName, `index.${format === 'cjs' ? 'cjs' : 'js'}`),
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: [...Object.keys(devDependencies || {}), ...Object.keys(peerDependencies || {})],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					'solid-js': 'SolidJS',
				},
			},
		},
	},
});
