import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { SpecialistAbout, SpecialistAboutProps } from './SpecialistAbout'

export default {
	title: 'SpecialistAbout',
	component: SpecialistAbout
} as Meta

type StoryArgs = Partial<SpecialistAboutProps>

const Template: Story<SpecialistAboutProps> = args => <SpecialistAbout {...args} />

export const basic = Template.bind({})

basic.args = {} as StoryArgs
