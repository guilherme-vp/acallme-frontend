import React from 'react'
import { Router } from '@reach/router'
import { Home } from 'screens/Home'
import { SecondPage } from 'screens/SecondPage'
import { MenuItem, Select, Typography } from '@material-ui/core'
import { useIntl, useStoreon } from 'hooks'
import { AvailableLanguages } from 'locales'
import { HOME, SECOND_PAGE } from './routes'

const App = () => {
	const intl = useIntl()
	const { dispatch, language } = useStoreon('language')

	return (
		<>
			<Router>
				<Home path={HOME} default />
				<SecondPage path={SECOND_PAGE} />
			</Router>
			<div style={{ marginTop: 50 }}>
				<Typography variant="body2">
					{intl.formatMessage({ id: 'changeLanguage' })}
				</Typography>
				<Select
					onChange={e => dispatch('language/change', e.target.value)}
					value={language}
				>
					<MenuItem disableRipple value={AvailableLanguages.ENGLISH}>
						{intl.formatMessage({ id: 'en' })}
					</MenuItem>
					<MenuItem disableRipple value={AvailableLanguages.PORTUGUESE}>
						{intl.formatMessage({ id: 'pt-BR' })}
					</MenuItem>
				</Select>
			</div>
		</>
	)
}

export default App
