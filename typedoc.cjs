const { readFileSync } = require('fs');
const { basename, dirname, join } = require('path');

const { exports: exp } = JSON.parse(readFileSync(join(__dirname, 'package.json')));

const entries = Object.entries(exp)
	.filter(([, value]) => value.import && value.require)
	.map(([, {import: file}]) => basename(dirname(file)));

module.exports = {
	entryPoints: entries.map((x) => `src/lib/${x}/index.ts`),
	out: 'typedoc',
	plugin: 'typedoc-plugin-markdown',
	gitRevision: 'main',
	readme: 'none',
	tsconfig: 'tsconfig.json',
};
