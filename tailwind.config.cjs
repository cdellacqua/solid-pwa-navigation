const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: {
		files: [
			'./index.html',
			'./src/**/*.{js,ts,jsx,tsx,mdx}',
			...(process.env.NODE_ENV === 'development'
				? []
				: ['!src/**/*.stories.{js,ts,jsx,tsx,mdx}', '!src/**/_*.{js,ts,jsx,tsx,mdx}']),
		],
	},
	plugins: [],
};
