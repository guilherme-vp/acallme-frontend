import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'

import { Search, SearchProps } from './Search'

export default {
	title: 'Search',
	component: Search
} as Meta

type StoryArgs = Partial<SearchProps>

const Template: Story<SearchProps> = args => <Search {...args} />

export const basic = Template.bind({})

basic.args = {
	loading: false,
	onSearch: (value: string) => console.log(value),
	onSearchInputChange: (value: string) => console.log(value)
} as StoryArgs
