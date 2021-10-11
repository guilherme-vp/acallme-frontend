import React from 'react'
import { Toolbar } from '@mui/material'
import { Copyright } from '../../parts/Copyright'
import { Container, Main } from './Auth.styled'
import { HeaderTitle } from '../../parts/Header'

export const AuthLayout: React.FC = ({ children }) => (
	<Container>
		<HeaderTitle />
		<Toolbar />
		<Main>{children}</Main>
		<Copyright />
	</Container>
)

export default AuthLayout
