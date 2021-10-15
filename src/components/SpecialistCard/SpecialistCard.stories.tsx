import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { SpecialistCard, SpecialistCardProps } from './SpecialistCard'

export default {
	title: 'SpecialistCard',
	component: SpecialistCard
} as Meta

type StoryArgs = Partial<SpecialistCardProps>

const Template: Story<SpecialistCardProps> = args => <SpecialistCard {...args} />

export const basic = Template.bind({})

basic.args = {
	id: faker.datatype.number(),
	avatar: faker.image.people(),
	cost: +faker.finance.amount(100, 1000),
	location: faker.name.jobType(),
	name: faker.name.findName(),
	onBook: () => {},
	role: faker.name.jobType(),
	specializations: Array(faker.datatype.number({ min: 1, max: 10 }))
		.fill(null)
		.map(() => faker.name.jobType())
} as StoryArgs
