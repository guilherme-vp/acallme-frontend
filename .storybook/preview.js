import React from 'react'
import { IntlProvider } from 'react-intl'

import { locales } from '../src/locales'
import { theme } from '../src/styles/theme'
import { StylesWrapper } from '../src/styles/Wrapper.styles'

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
		<StylesWrapper>
			<IntlProvider locale="en" defaultLocale="en" messages={locales['en']}>
				<Story />
			</IntlProvider>
		</StylesWrapper>
	)
]
