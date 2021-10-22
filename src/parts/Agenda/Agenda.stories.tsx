import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { RolesEnum } from 'services/entities'

import { Agenda, AgendaProps } from './Agenda'

export default {
	title: 'Agenda',
	component: Agenda
} as Meta

type StoryArgs = Partial<AgendaProps>

const Template: Story<AgendaProps> = args => <Agenda {...args} />

export const basic = Template.bind({})

basic.args = {
	onConfirm: () => {},
	onDisable: () => {},
	onViewDetails: () => {},
	role: RolesEnum.Patient
} as StoryArgs
