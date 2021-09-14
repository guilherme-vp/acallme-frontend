export const theme = {
	colors: {
		primary: '#333',
		secondary: '#000'
	},
	background: {
		main: '#FAFAFA'
	},
	text: {
		main: '#333',
		link: '#4a90e2'
	}
}

export type Theme = typeof theme

declare module 'styled-components' {
	// eslint-disable-next-line
	interface DefaultTheme extends Theme {}
}
