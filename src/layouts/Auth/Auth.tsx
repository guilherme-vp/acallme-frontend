import React from 'react'

import { Grid, Divider, Toolbar } from '@mui/material'

import { Copyright } from 'parts/Copyright'
import { HeaderTitle } from 'parts/Header'

import * as S from './Auth.styled'

export const AuthLayout: React.FC = ({ children }) => (
	<S.Container
		container
		alignItems="center"
		justifyContent="space-between"
		flexDirection="column"
	>
		<Grid item>
			<HeaderTitle />
			<Toolbar sx={{ height: '77px' }} />
		</Grid>
		<S.Content container>{children}</S.Content>
		<Grid container flexDirection="column" alignItems="center">
			<Copyright />
		</Grid>
	</S.Container>
)

export default AuthLayout
