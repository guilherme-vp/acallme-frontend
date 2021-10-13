import React from 'react'

import { Grid, Divider } from '@mui/material'

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
		</Grid>
		<S.Content container>{children}</S.Content>
		<Grid container flexDirection="column" alignItems="center">
			<Divider flexItem sx={{ marginY: 3 }} />
			<Copyright />
		</Grid>
	</S.Container>
)

export default AuthLayout
