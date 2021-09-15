import React from 'react'
import { MenuItem, Select } from '@material-ui/core'

import { useIntl, useStoreon } from '../../hooks'
import { AvailableLanguages } from '../../locales'

export const LanguagePicker = () => {
	const { dispatch, language } = useStoreon('language')
	const intl = useIntl()

	return (
		<Select onChange={e => dispatch('language/change', e.target.value)} value={language}>
			<MenuItem
				disableRipple
				value={AvailableLanguages.ENGLISH}
				selected={language === 'en'}
			>
				{intl.formatMessage({ id: 'en' })}
			</MenuItem>
			<MenuItem
				disableRipple
				value={AvailableLanguages.PORTUGUESE}
				selected={language === 'pt-BR'}
			>
				{intl.formatMessage({ id: 'pt-BR' })}
			</MenuItem>
		</Select>
	)
}

export default LanguagePicker
