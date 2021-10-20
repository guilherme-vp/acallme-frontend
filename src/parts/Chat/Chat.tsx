import React, { useEffect } from 'react'

import { animateScroll } from 'react-scroll'

import { ChatSender } from 'components/ChatSender'
import { Message, MessageProps } from 'components/Message'

import * as S from './Chat.styled'

export interface ChatProps {
	chat: MessageProps[]
	sendMessage: (content: string) => void
}

export const Chat = ({ chat, sendMessage }: ChatProps) => {
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
		<S.ChatContainer>
			<S.MessageWrapper id="container-wrapper">
				{chat
					.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
					.map((message, idx) => (
						<Message {...message} key={idx} />
					))}
			</S.MessageWrapper>
			<S.SenderContainer>
				<ChatSender onSend={sendMessage} />
			</S.SenderContainer>
		</S.ChatContainer>
	)
}

export default Chat
