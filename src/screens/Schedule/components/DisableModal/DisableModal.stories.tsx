import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { DisableModal, DisableModalProps } from './DisableModal'

export default {
	title: 'DisableModal',
	component: DisableModal
} as Meta

type StoryArgs = Partial<DisableModalProps>

const Template: Story<DisableModalProps> = args => <DisableModal {...args} />

export const basic = Template.bind({})

basic.args = {
	date: faker.date.future(),
	open: true,
	loading: false,
	handleClose: () => {},
	onDisable: date => console.log(date)
} as StoryArgs
