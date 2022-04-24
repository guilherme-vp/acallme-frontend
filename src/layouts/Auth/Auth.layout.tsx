import React from 'react'

import { Grid, Toolbar } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { Copyright } from 'parts/Copyright'
import { HeaderTitle } from 'parts/Header'
import { SCHEDULE } from 'routes'

import * as S from './Auth.styled'

export const AuthLayout: React.FC = () => {
	const { token } = useStoreon('token')

	if (token) {
		return <Navigate to={SCHEDULE} />
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
			<S.Content container>
				<Outlet />
			</S.Content>
			<Grid container flexDirection="column" alignItems="center">
				<Copyright />
			</Grid>
		</S.Container>
	)
}

export default AuthLayout
