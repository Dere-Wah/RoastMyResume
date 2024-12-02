const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontSize: {
				clamp: "clamp(3rem, 5vw, 10rem)",
			},
		},
	},
	plugins: [plugin(function({ addUtilities }) {
		addUtilities({
		  ".no-scrollbar::-webkit-scrollbar": {
			'display': 'none',
		  },
		  ".no-scrollbar": {
			  '-ms-overflow-style': 'none',
			  "scrollbar-width": "none"
			},
		})
	  })],
}
