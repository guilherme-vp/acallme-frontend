import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { SearchInput, SearchInputProps } from './SearchInput'

export default {
	title: 'SearchInput',
	component: SearchInput
} as Meta

type StoryArgs = Partial<SearchInputProps>

const Template: Story<SearchInputProps> = args => <SearchInput {...args} />

export const basic = Template.bind({})

basic.args = {} as StoryArgs
