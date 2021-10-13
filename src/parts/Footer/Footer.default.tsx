import React from 'react'

import { Typography, Grid } from '@mui/material'

import { LanguagePicker } from 'components/LanguagePicker'
import { useIntl } from 'hooks'

export const Footer = () => {
	const intl = useIntl()

	return (
		<footer>
			<Grid container spacing={1} my={2} flexDirection="column" alignItems="center">
				<Grid item>
					<Typography variant="h4" color="textSecondary" fontWeight={500}>
						{intl.formatMessage({ id: 'home.footer.language' })}
					</Typography>
				</Grid>

				<Grid item>
					<LanguagePicker />
				</Grid>
			</Grid>
		</footer>
	)
}

export default Footer
