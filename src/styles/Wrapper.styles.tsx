import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'

import { theme } from './theme'
import { materialTheme } from './material-theme'
import { GlobalStyle } from './Global.styles'

export const StylesWrapper: React.FC = ({ children }) => (
	<MuiThemeProvider theme={materialTheme}>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	</MuiThemeProvider>
)
