import React from 'react'
import { Select } from '@material-ui/core'

import { useIntl, useStoreon } from '../../hooks'
import { AvailableLanguages, Locales } from '../../locales'

import { Item } from './LanguagePicker.styled'

export const LanguagePicker = () => {
	const { dispatch, language } = useStoreon('language')
	const intl = useIntl()

	const handleChange = (event: React.ChangeEvent<{ value: Locales }>) => {
		const newLanguage = event.target.value

		dispatch('language/change', newLanguage)
	}

	return (
		<Select onChange={handleChange} value={language} variant="outlined" sx={{ padding: 0 }}>
			<Item disableRipple value={AvailableLanguages.ENGLISH} selected={language === 'en'}>
				{intl.formatMessage({ id: 'en' })}
			</Item>
			<Item
				disableRipple
				value={AvailableLanguages.PORTUGUESE}
				selected={language === 'pt-BR'}
			>
				{intl.formatMessage({ id: 'pt-BR' })}
			</Item>
		</Select>
	)
}

export default LanguagePicker
