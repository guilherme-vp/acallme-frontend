import React from 'react'

import { Grid, Typography } from '@mui/material'
import { format } from 'date-fns'

import * as S from './Message.styled'

export interface Message {
	id: string
	name: string
	avatarUrl?: string
	message: string
	isSpeaker: boolean
	createdAt: Date
}

export type MessageProps = Omit<Message, 'id'>

export const Message = ({
	avatarUrl,
	isSpeaker,
	message,
	name,
	createdAt
}: MessageProps) => {
	return (
		<Grid container flexDirection={isSpeaker ? 'row-reverse' : 'row'} sx={{ padding: 1 }}>
			<Grid
				container
				item
				xs="auto"
				flexDirection="column"
				alignItems={isSpeaker ? 'flex-end' : 'flex-start'}
				justifyContent="center"
			>
				<S.MessageContent
					isSpeaker={isSpeaker}
					container
					item
					alignItems="center"
					justifyContent={isSpeaker ? 'flex-end' : 'flex-start'}
					xs="auto"
				>
					<Typography variant="body2">{message}</Typography>
				</S.MessageContent>
				<Grid item mt={1}>
					<Typography variant="body2" fontWeight={600}>
						{format(createdAt, 'p').toLowerCase()}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Message
