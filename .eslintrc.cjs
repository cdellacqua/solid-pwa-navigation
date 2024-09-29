module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:solid/typescript'],
	plugins: ['solid', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019,
		project: 'tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'prettier/prettier': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'warn',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'warn',
		'@typescript-eslint/no-misused-promises': 'warn',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',
		'@typescript-eslint/consistent-type-imports': 'warn',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
