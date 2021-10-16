import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { Schedule, ScheduleProps } from './Schedule'

export default {
	title: 'Schedule',
	component: Schedule
} as Meta

type StoryArgs = Partial<ScheduleProps>

const Template: Story<ScheduleProps> = args => <Schedule {...args} />

export const basic = Template.bind({})

basic.args = {
	patientId: faker.datatype.number(),
	specialistId: faker.datatype.number()
} as StoryArgs
