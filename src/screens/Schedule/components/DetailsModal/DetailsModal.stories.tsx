import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { DetailsModal, DetailsModalProps } from './DetailsModal'

export default {
	title: 'DetailsModal',
	component: DetailsModal
} as Meta

type StoryArgs = Partial<DetailsModalProps>

const Template: Story<DetailsModalProps> = args => <DetailsModal {...args} />

export const basic = Template.bind({})

basic.args = {
	date: faker.date.future(),
	handleClose: () => {},
	open: true,
	loading: false,
	user: {
		id: faker.datatype.number(),
		email: faker.internet.email(),
		name: faker.name.findName(),
		avatarUrl: faker.image.people()
	}
} as StoryArgs
