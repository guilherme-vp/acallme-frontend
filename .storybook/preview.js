import React from 'react'
import AppWrappers from '../src/Wrappers'
import { theme } from '../src/styles/theme'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	backgrounds: {
		default: 'light',
		values: [
			{
				name: 'light',
				value: theme.background.light
			}
		]
	}
}
export const decorators = [
	Story => (
		<AppWrappers>
			<Story />
		</AppWrappers>
	)
]
