import React from 'react'

import { ThemeProvider as MuiThemeProvider } from '@mui/system'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './Global.styles'
import { materialTheme } from './material-theme'
import { theme } from './theme'

export const StylesWrapper: React.FC = ({ children }) => (
	<MuiThemeProvider theme={materialTheme}>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	</MuiThemeProvider>
)
