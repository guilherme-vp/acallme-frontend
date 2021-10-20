import React, { useLayoutEffect } from 'react'

import { Grid, Toolbar } from '@mui/material'
import { useParams } from 'react-router'

import { CallProvider } from 'contexts'
import { HeaderTitle } from 'parts/Header'

import * as S from './Videocall.styled'

export const VideocallLayout: React.FC = ({ children }) => {
	const { scheduleId } = useParams<{ scheduleId: string }>()

	useLayoutEffect(() => {
		// TODO: add api verification checking if user is allowed to enter this call
	}, [])

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
			<CallProvider>
				<Grid container>{children}</Grid>
			</CallProvider>
		</S.Container>
	)
}

export default VideocallLayout
