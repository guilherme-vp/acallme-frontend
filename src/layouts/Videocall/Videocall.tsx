import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { CallProvider } from 'contexts'
import { useStoreon } from 'hooks'
import { LOGIN } from 'routes'

import * as S from './Videocall.styled'

export const VideocallLayout: React.FC = ({ children }) => {
	const { token } = useStoreon('token')

	if (!token) {
		return <Navigate to={LOGIN} />
	}

	return (
		<S.Container>
			<CallProvider>
				<Outlet />
			</CallProvider>
		</S.Container>
	)
}

export default VideocallLayout
