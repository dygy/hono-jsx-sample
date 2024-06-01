/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./@media/**/*.{ts,tsx}",
		"./@stocks/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			zIndex: {
				"1":"1",
				"2":"2",
				"3":"3",
				"4":"4",
				"5":"5",
				"6":"6",
				"7":"7",
				"8":"8",
				"9":"9",
				"11":"11",
				"12":"12",
				"13":"13",
				"14":"14",
				"15":"15",
				"16":"16",
				"17":"17",
				"18":"18",
				"19":"19",
				"99":"99",
				"100":"100"
			},
			transitionDuration: {
				2000: "2000ms",
				1500: "1500ms",
				1200: "1200ms",
				1050: "1050ms",
				750: "750ms",
				600: "600ms",
				550: "550ms",
			},
			transitionDelay: {
				2000: "2000ms",
				1500: "1500ms",
				1200: "1200ms",
				1050: "1050ms",
				750: "750ms",
				550: "550ms",
				600: "600ms",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("tailwindcss/nesting"),
	],
};
