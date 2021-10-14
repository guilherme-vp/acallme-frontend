import React from 'react'

import { Grid, Toolbar } from '@mui/material'

import { Copyright } from 'parts/Copyright'
import { HeaderLogged } from 'parts/Header'

import * as S from './Dashboard.styled'

export const DashboardLayout: React.FC = ({ children }) => (
	<S.Container
		container
		alignItems="center"
		justifyContent="space-between"
		flexDirection="column"
	>
		<Grid item>
			<HeaderLogged />
			<Toolbar sx={{ height: '77px' }} />
		</Grid>
		<S.Content container>{children}</S.Content>
		<Grid container flexDirection="column" alignItems="center">
			<Copyright />
		</Grid>
	</S.Container>
)

export default DashboardLayout
