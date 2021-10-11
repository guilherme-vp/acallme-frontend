import React from 'react'
import { Typography, Grid } from '@mui/material'
import { useIntl } from 'hooks'
import { LanguagePicker } from 'components/LanguagePicker'

export const Footer = () => {
	const intl = useIntl()

	return (
		<footer>
			<Grid container spacing={1} mt={2} justifyContent="flex-end">
				<Grid item xs={12}>
					<Typography variant="h4" color="textSecondary" fontWeight={500}>
						{intl.formatMessage({ id: 'home.footer.language' })}
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<LanguagePicker />
				</Grid>
			</Grid>
		</footer>
	)
}

export default Footer
