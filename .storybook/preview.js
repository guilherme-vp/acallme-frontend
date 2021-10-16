import React from 'react'
import { IntlProvider } from 'react-intl'

import { locales } from '../src/locales'
import { theme } from '../src/styles/theme'
import { StylesWrapper } from '../src/styles/Wrapper.styles'
import { StylesProvider } from '@material-ui/styles'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	backgrounds: {
		default: 'light',
		values: [
			{
				name: 'light',
				value: theme.background.calm
			}
		]
	}
}
export const decorators = [
	Story => (
		<StylesProvider injectFirst>
			<StylesWrapper>
				<IntlProvider locale="en" defaultLocale="en" messages={locales['en']}>
					<Story />
				</IntlProvider>
			</StylesWrapper>
		</StylesProvider>
	)
]
