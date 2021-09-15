import React from 'react'
import { StyledEngineProvider } from '@material-ui/styled-engine'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'

import { theme } from './theme'
import { materialTheme } from './material-theme'
import { GlobalStyle } from './Global.styles'

export const StylesWrapper: React.FC = ({ children }) => (
	<StyledEngineProvider injectFirst>
		<MuiThemeProvider theme={materialTheme}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</MuiThemeProvider>
	</StyledEngineProvider>
)
