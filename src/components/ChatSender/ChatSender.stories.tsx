import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { ChatSender, ChatSenderProps } from './ChatSender'

export default {
	title: 'ChatSender',
	component: ChatSender
} as Meta

type StoryArgs = Partial<ChatSenderProps>

const Template: Story<ChatSenderProps> = args => <ChatSender {...args} />

export const basic = Template.bind({})

basic.args = {
	onSend: content => console.log(content)
} as StoryArgs
