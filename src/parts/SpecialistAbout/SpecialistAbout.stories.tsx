import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import faker from 'faker'

import { SpecialistAbout, SpecialistAboutProps } from './SpecialistAbout'

export default {
	title: 'SpecialistAbout',
	component: SpecialistAbout
} as Meta

type StoryArgs = Partial<SpecialistAboutProps>

const Template: Story<SpecialistAboutProps> = args => <SpecialistAbout {...args} />

export const basic = Template.bind({})

basic.args = {
	open: true,
	handleClose() {
		this.open = false
	},
	userId: faker.datatype.number(10),
	specialist: {
		about: faker.lorem.text(),
		cost: faker.datatype.float({ min: 100, max: 500, precision: 2 }),
		email: faker.internet.email(),
		name: faker.name.findName(),
		phone: faker.phone.phoneNumber(),
		avatarUrl: faker.image.people(),
		id: faker.datatype.number(10),
		specialties: Array(faker.datatype.number({ min: 1, max: 10 }))
			.fill(null)
			.map(() => ({ id: faker.datatype.number(), name: faker.name.jobType() }))
	}
} as StoryArgs
