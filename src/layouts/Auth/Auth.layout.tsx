import React from 'react'

import { Grid, Toolbar } from '@mui/material'
import { Redirect } from 'react-router'

import { useStoreon } from 'hooks'
import { Copyright } from 'parts/Copyright'
import { HeaderTitle } from 'parts/Header'
import { SPECIALISTS } from 'routes'

import * as S from './Auth.styled'

export const AuthLayout: React.FC = ({ children }) => {
	const { token } = useStoreon('token')

	if (token) {
		return <Redirect to={SPECIALISTS} />
	}

	return (
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
}

export default AuthLayout
