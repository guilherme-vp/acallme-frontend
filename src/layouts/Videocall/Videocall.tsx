import React from 'react'

import { Redirect } from 'react-router'

import { CallProvider } from 'contexts'
import { useStoreon } from 'hooks'
import { LOGIN } from 'routes'

import * as S from './Videocall.styled'

export const VideocallLayout: React.FC = ({ children }) => {
	const { token } = useStoreon('token')

	if (!token) {
		return <Redirect to={LOGIN} />
	}

	return (
		<S.Container>
			<CallProvider>{children}</CallProvider>
		</S.Container>
	)
}

export default VideocallLayout
