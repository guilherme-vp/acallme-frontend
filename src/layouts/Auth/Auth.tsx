import React from 'react'
import { Grid } from '@mui/material'
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
		<S.Content container item xs={12} sm={10} md={8}>
			{children}
		</S.Content>
		<Grid item>
			<Copyright />
		</Grid>
	</S.Container>
)

export default AuthLayout
