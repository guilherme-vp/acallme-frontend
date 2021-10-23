import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { ConfirmationModal, ConfirmationModalProps } from './ConfirmationModal'

export default {
	title: 'ConfirmationModal',
	component: ConfirmationModal
} as Meta

type StoryArgs = Partial<ConfirmationModalProps>

const Template: Story<ConfirmationModalProps> = args => <ConfirmationModal {...args} />

export const basic = Template.bind({})

basic.args = {
	date: faker.date.future(),
	handleClose: () => {},
	onConfirm: () => {},
	open: true,
	loading: false,
	patient: {
		id: faker.datatype.number(),
		email: faker.internet.email(),
		name: faker.name.findName(),
		avatarUrl: faker.image.people()
	},
	scheduleId: faker.datatype.number()
} as StoryArgs
