import 'styled-components'

export const theme = {
	colors: {
		primary: '#0e63f4',
		secondary: '#4362BA',
		darker: '#1D2B4E'
	},
	background: {
		main: '#F8F9FE'
	},
	text: {
		main: '#1D2B4E',
		description: '#656A80',
		link: '#4a90e2'
	},
	grey: {
		main: '#918C9B',
		secondary: '#B5BED2',
		darker: '#666b7f'
	},
	tags: {
		black: '#000000',
		white: '#FFFFFF'
	},
	border: {
		thin: '#EBEFF2',
		darker: '#E2E2EA'
	}
}

export type Theme = typeof theme

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}
