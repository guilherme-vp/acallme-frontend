import React from 'react'
import { IntlProvider } from 'react-intl/'
import { LocalizationProvider } from '@mui/lab'
import DateFnsUtils from '@mui/lab/AdapterDateFns'

import { useStoreon } from './hooks'
import { locales } from './locales'

import { StylesWrapper } from './styles/Wrapper.styles'

export const Wrappers: React.FC = ({ children }) => {
	const { language } = useStoreon('language')

	return (
		<StylesWrapper>
			<IntlProvider locale={language} defaultLocale="pt-BR" messages={locales[language]}>
				<LocalizationProvider dateAdapter={DateFnsUtils}>{children}</LocalizationProvider>
			</IntlProvider>
		</StylesWrapper>
	)
}

export default Wrappers
