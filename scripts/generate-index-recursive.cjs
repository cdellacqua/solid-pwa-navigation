const {spawnSync} = require('child_process');
const {writeFileSync, readdirSync, statSync, existsSync} = require('fs');
const {join, basename, parse} = require('path');

const sourceClient = join('src', 'lib');

function recursive(source, path) {
	const matchingDirectories = readdirSync(path).filter(
		(x) => !x.startsWith('_') && statSync(join(path, x)).isDirectory(),
	);
	for (const dir of matchingDirectories) {
		recursive(source, join(path, dir));
	}
	if (path !== source) {
		spawnSync('node', [join('scripts', 'generate-index-for.cjs'), path], {
			stdio: 'inherit',
		});
	}
}

recursive(sourceClient, sourceClient);
