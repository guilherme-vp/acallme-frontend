import React, { useLayoutEffect } from 'react'

import { useParams } from 'react-router'

import { CallProvider } from 'contexts'

import * as S from './Videocall.styled'

export const VideocallLayout: React.FC = ({ children }) => {
	const { scheduleId } = useParams<{ scheduleId: string }>()

	useLayoutEffect(() => {
		// TODO: add api verification checking if user is allowed to enter this call
	}, [])

	return (
		<S.Container>
			<CallProvider>{children}</CallProvider>
		</S.Container>
	)
}

export default VideocallLayout
