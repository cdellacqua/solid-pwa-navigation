const {writeFileSync, readdirSync, statSync, existsSync} = require('fs');
const {join, basename, parse} = require('path');

const sources = process.argv.slice(2);

const allowedExtensions = ['.ts', '.js', '.tsx', '.jsx'];

for (const source of sources) {
	if (statSync(source).isDirectory()) {
		const exportStrings = readdirSync(source)
			.filter(
				(x) =>
					!x.startsWith('_') &&
					!x.includes('.test.') &&
					!x.endsWith('.d.ts') &&
					((parse(basename(x)).name !== 'index' &&
						allowedExtensions.includes(parse(basename(x)).ext)) ||
						(statSync(join(source, x)).isDirectory() &&
							allowedExtensions.some((ext) => existsSync(join(source, x, 'index' + ext))))),
			)
			.map((x) => `export * from './${parse(basename(x)).name}';`);

		if (exportStrings.length > 0) {
			writeFileSync(join(source, 'index.ts'), exportStrings.join('\n') + '\n');
		} else {
			console.warn(`no file to export found in "${source}"`);
		}
	}
}
