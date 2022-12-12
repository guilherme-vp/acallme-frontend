import React, { useEffect } from 'react'

import { Divider, Slide, Typography, IconButton } from '@mui/material'
import { MdClose as CloseIcon } from 'react-icons/md'
import { animateScroll } from 'react-scroll'

import { ChatSender } from 'components/ChatSender'
import { Message } from 'components/Message'
import { useIntl } from 'hooks'

import * as S from './Chat.styled'

export interface ChatProps {
	chat: Message[]
	sendMessage: (content: string) => void
	open: boolean
	handleClose: () => void
}

export const Chat = ({ chat, sendMessage, open, handleClose }: ChatProps) => {
	const intl = useIntl()
	const scrollToBottom = () => {
		animateScroll.scrollToBottom({
			containerId: 'container-wrapper',
			isDynamic: true,
			duration: 0
		})
	}

	useEffect(() => {
		scrollToBottom()
	}, [chat])

	return (
		<Slide direction="left" in={open}>
			<S.ChatContainer>
				<S.Header>
					<Typography variant="body1">
						{intl.formatMessage({ id: 'chat.title' })}
					</Typography>
					<IconButton onClick={() => handleClose()} sx={{ fontSize: 18 }}>
						<CloseIcon />
					</IconButton>
				</S.Header>
				<Divider />
				<S.MessageWrapper id="container-wrapper">
					{chat.length === 0 && (
						<Typography
							sx={{ width: '100%', paddingX: '24px' }}
							variant="body2"
							textAlign="center"
						>
							{intl.formatMessage({ id: 'chat.titleMessage' })}
						</Typography>
					)}
					{chat
						.sort((a, b) => a.createdAt.getTime() + b.createdAt.getTime())
						.map(({ id, ...message }) => (
							<Message {...message} key={id} />
						))}
				</S.MessageWrapper>
				<S.SenderContainer>
					<ChatSender onSend={sendMessage} />
				</S.SenderContainer>
			</S.ChatContainer>
		</Slide>
	)
}

export default Chat
