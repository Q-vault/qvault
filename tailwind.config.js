module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			'text': '#fcfcfd',
			'background': '#070609',
			'primary': '#503956',
			'secondary': '#251821',
			'accent': '#6742b8',
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
