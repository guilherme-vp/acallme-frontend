import React, { useState } from 'react'

import { Box } from '@mui/material'
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
		setChat(prev =>
			[
				...prev,
				{
					message,
					createdAt: new Date(),
					isSpeaker: faker.datatype.boolean(),
					name,
					avatarUrl
				}
			].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
		)
	}

	return (
		<Box sx={{ height: '80vh', padding: '16px', backgroundColor: '#202124' }}>
			<Chat chat={chat} sendMessage={sendMessage} open handleClose={() => {}} />
		</Box>
	)
}

export const basic = Template.bind({})
