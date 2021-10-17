import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { Agenda, AgendaProps } from './Agenda'

export default {
	title: 'Agenda',
	component: Agenda
} as Meta

type StoryArgs = Partial<AgendaProps>

const Template: Story<AgendaProps> = args => <Agenda {...args} />

export const basic = Template.bind({})

basic.args = {
	patientId: faker.datatype.number(),
	specialistId: faker.datatype.number(),
	onClick: (scheduleId: number) => console.log(`Triggered on id: ${scheduleId}`)
} as StoryArgs
