import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { Record, RecordProps } from './Record'

export default {
	title: 'Record',
	component: Record
} as Meta

type StoryArgs = Partial<RecordProps>

const Template: Story<RecordProps> = args => <Record {...args} />

export const basic = Template.bind({})

basic.args = {
	onSubmit: data => console.log(data),
	open: true,
	handleClose() {
		this.open = false
	},
	callEnded: false
} as StoryArgs
