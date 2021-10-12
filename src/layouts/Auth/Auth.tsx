import React from 'react'
import { Grid, Divider } from '@mui/material'
import { HeaderTitle } from 'parts/Header'
import { Copyright } from 'parts/Copyright'
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
		<S.Content container item xs={12} sm={10}>
			{children}
		</S.Content>
		<Grid container flexDirection="column" alignItems="center">
			<Divider flexItem sx={{ marginY: 3 }} />
			<Copyright />
		</Grid>
	</S.Container>
)

export default AuthLayout
