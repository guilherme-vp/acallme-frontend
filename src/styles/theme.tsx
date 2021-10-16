import 'styled-components'

export const theme = {
	colors: {
		primary: '#0e63f4',
		secondary: '#4362BA',
		darker: '#1D2B4E',
		alternative: '#F49F0E'
	},
	background: {
		main: '#F8F9FE',
		disabled: '#EFEFEF',
		light: '#FFF',
		calm: '#F9FAFF'
	},
	text: {
		main: '#1D2B4E',
		description: '#656A80',
		link: '#4a90e2'
	},
	grey: {
		main: '#918C9B',
		secondary: '#B5BED2',
		third: '#DEDEDE',
		fourth: '#EFEFEF',
		darker: '#666b7f'
	},
	tags: {
		black: '#000000',
		white: '#FFFFFF',
		yellow: '#F49F0E'
	},
	border: {
		thin: '#E9ECEE',
		darker: '#E2E2EA',
		colored: '#F49F0E'
	},
	button: {
		background: '#0e63f4',
		hover: '#0947b3',
		color: 'white'
	},
	input: {
		borderFocus: '#0e63f4'
	},
	shadow: {
		first: '0 3px 10px rgba(0, 0, 0, 0.04)',
		second: '0 7px 60px rgba(0, 0, 0, 0.12)',
		third: '0 2px 5px rgba(112, 144, 176, 0.12)'
	}
}

export type Theme = typeof theme

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}
