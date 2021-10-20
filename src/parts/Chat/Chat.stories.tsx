import React, { useState } from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { MessageProps } from 'components/Message'

import { Chat, ChatProps } from './Chat'

export default {
	title: 'Chat',
	component: Chat
} as Meta

const Template: Story<ChatProps> = () => {
	const [chat, setChat] = useState<MessageProps[]>([])
	const name = faker.name.firstName()
	const avatarUrl = faker.image.people()

	const sendMessage = (message: string) => {
		setChat(prev => [
			...prev,
			{
				message,
				createdAt: faker.date.recent(0),
				isSpeaker: faker.datatype.boolean(),
				name,
				avatarUrl
			}
		])
	}

	return <Chat chat={chat} sendMessage={sendMessage} />
}

export const basic = Template.bind({})
