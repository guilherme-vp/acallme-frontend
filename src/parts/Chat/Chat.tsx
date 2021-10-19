import React, { useState, useEffect } from 'react'

import faker from 'faker'
import { animateScroll } from 'react-scroll'

import { ChatSender } from 'components/ChatSender'
import { Message, MessageProps } from 'components/Message'

import * as S from './Chat.styled'

interface Interlocutor {
	name: string
	avatarUrl: string
}

export interface ChatProps {
	speaker: Interlocutor
	listener: Interlocutor
}

export const Chat = ({ listener, speaker }: ChatProps) => {
	const [messages, setMessages] = useState<MessageProps[]>([])

	const scrollToBottom = () => {
		animateScroll.scrollToBottom({
			containerId: 'container-wrapper',
			isDynamic: true,
			duration: 0
		})
	}

	const addMessage = (content: Omit<MessageProps, 'createdAt' | 'id'>) => {
		const newMessage = {
			...content,
			createdAt: new Date()
		}

		setMessages(prev => [...prev, newMessage])
	}

	const sendMessage = (content: string) => {
		addMessage({
			...speaker,
			isSpeaker: true,
			message: content
		})

		scrollToBottom()
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			addMessage({
				...listener,
				message: faker.lorem.text(),
				isSpeaker: false
			})
			scrollToBottom()
		}, 5000)

		return () => clearInterval(intervalId)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<S.ChatContainer>
			<S.MessageWrapper id="container-wrapper">
				{messages
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
