const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontSize: {
				clamp: "clamp(3rem, 5vw, 10rem)",
			},
			keyframes: {
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				suggestion: {
					"0%": {
						transform: "scaleY(0)"
					},
					"100%":{
						transform: "scaleY(1)"
					}
				}
			},
			animation: {
				fadeInUp: 'fadeInUp 1s ease-out',
				suggestion: "suggestion 100ms ease-out"
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
