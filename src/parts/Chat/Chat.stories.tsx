import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { Chat, ChatProps } from './Chat'

export default {
	title: 'Chat',
	component: Chat
} as Meta

type StoryArgs = Partial<ChatProps>

const Template: Story<ChatProps> = args => <Chat {...args} />

export const basic = Template.bind({})

basic.args = {
	speaker: {
		id: 1,
		name: 'Gui',
		avatarUrl: null
	},

	listener: {
		id: 2,
		name: 'João',
		avatarUrl:
			'https://revistatudo.com.br/wp-content/uploads/2020/08/Cr%C3%A9dito-da-foto-Gustavo-Arrais_Marina_Person_02-12-2015_3887.jpg'
	}
} as StoryArgs
