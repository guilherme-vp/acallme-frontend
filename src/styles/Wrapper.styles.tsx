import React from 'react'
import { StyledEngineProvider } from '@material-ui/styled-engine'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './Global.styles'

export const StylesWrapper: React.FC = ({ children }) => (
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	</StyledEngineProvider>
)
