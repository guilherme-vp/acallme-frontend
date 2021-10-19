import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { Message, MessageProps } from './Message'

export default {
	title: 'Message',
	component: Message
} as Meta

type StoryArgs = Partial<MessageProps>

const Template: Story<MessageProps> = args => <Message {...args} />

export const basic = Template.bind({})

basic.args = {
	avatarUrl: faker.image.people(48, 48),
	createdAt: faker.date.recent(0, new Date()),
	isSpeaker: faker.datatype.boolean(),
	message: faker.lorem.text(),
	name: faker.name.firstName()
} as StoryArgs
