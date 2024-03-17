/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px'
		},

		fontFamily: {
			inter: ['Inter', 'sans-serif'],
			happy: ['Happy', 'sans-serif']
		},
		extend: {
			borderRadius: {
				cards: '12px'
			},

			colors: {
				un: {
					DEFAULT: '#F2FAF6',
					medium: '#BDDDCE',
					dark: '#00BE1E'
				},
				deux: {
					DEFAULT: '#F8F5F9',
					medium: '#D062ED',
					dark: '#B500E5'
				},
				trois: {
					DEFAULT: '#F6ECED',
					medium: '#C47D5F',
					dark: '#A33300'
				},
				quatre: {
					DEFAULT: '#F6EBEE',
					medium: '#EFC4C4',
					dark: '#FF0D00'
				},
				cinq: {
					DEFAULT: '#E5F6FF',
					medium: '#C3EAFF',
					dark: '#009BEF'
				},
				six: '#A8D1E7',
				sept: '#F4D1AF',
				huit: '#AFE8BF',
				gray: {
					pastel: '#FBFBFB',
					20: '#CCCCCC',
					40: '#999999',
					60: '#666666',
					80: '#333333'
				}
			}
		}
	},
	plugins: [require('tailwindcss-interaction-media')]
};
