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
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif']
		},
		extend: {
			borderRadius: {
				cards: '12px'
			},
			colors: {
				blue: '#1fb6ff',
				purple: '#7e5bef',
				pink: '#ff49db',
				orange: '#ff7849',
				primary: {
					DEFAULT: '#EA5341',
					hover: '#DA402E'
				},
				secondary: '#192945',
				tertiary: {
					light: '#EAF3FF',
					dark: '#CFE4FF'
				},
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
	plugins: []
};
