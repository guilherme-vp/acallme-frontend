/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Grid, useMediaQuery, Theme, Typography, Hidden, Divider } from '@material-ui/core'
import { useIntl } from 'hooks'
import { Instagram, Facebook, Twitter } from '@material-ui/icons'
import { useTheme } from 'styled-components'
import { LanguagePicker } from 'components/LanguagePicker'

export const Footer = () => {
	const theme = useTheme()
	const intl = useIntl()
	const isSmDown = useMediaQuery((materialTheme: Theme) =>
		materialTheme.breakpoints.down('sm')
	)

	return (
		<footer>
			<Grid container item>
				<Typography variant="display2">ACall Me</Typography>
			</Grid>

			<Grid container justifyContent={isSmDown ? 'center' : 'space-between'}>
				<Grid container item xs={12} md direction="column" my={2} spacing={1}>
					<Grid container item spacing={1}>
						<Grid item>
							<Typography variant="h4" fontWeight={500}>
								{intl.formatMessage({ id: 'home.footer.about.title' })}
							</Typography>
						</Grid>

						<Grid item>
							<Typography color="textSecondary" variant="body1">
								{intl.formatMessage({ id: 'home.footer.about.description' })}
							</Typography>
						</Grid>
					</Grid>

					<Hidden smDown>
						<Grid container item spacing={1} mt={2}>
							<Grid item xs={12}>
								<Typography variant="h4" color="textSecondary" fontWeight={500}>
									{intl.formatMessage({ id: 'home.footer.language' })}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<LanguagePicker />
							</Grid>
						</Grid>
					</Hidden>
				</Grid>

				<Grid
					container
					item
					xs={12}
					md
					direction="column"
					alignItems={isSmDown ? 'flex-start' : 'flex-end'}
					spacing={1}
					my={2}
				>
					<Grid item>
						<Typography color="textSecondary" variant="body1">
							{intl.formatMessage({ id: 'home.footer.address' })}
						</Typography>
					</Grid>

					<Grid item>
						<Typography color="textSecondary" variant="body1">
							{intl.formatMessage({ id: 'home.footer.contact' })}
						</Typography>
					</Grid>

					<Grid
						container
						item
						xs
						justifyContent={isSmDown ? 'flex-start' : 'flex-end'}
						spacing={2}
					>
						<Grid item>
							<a target="_blank" href="#" rel="noopener noreferrer">
								<Instagram sx={{ color: theme.grey.darker }} />
							</a>
						</Grid>
						<Grid item>
							<a target="_blank" href="#" rel="noopener noreferrer">
								<Facebook sx={{ color: theme.grey.darker }} />
							</a>
						</Grid>
						<Grid item>
							<a target="_blank" href="#" rel="noopener noreferrer">
								<Twitter sx={{ color: theme.grey.darker }} />
							</a>
						</Grid>
					</Grid>
				</Grid>

				<Hidden smUp>
					<Grid item xs={12} my={2}>
						<Divider flexItem />
					</Grid>

					<Grid container item direction="column" alignItems="center" spacing={1} my={2}>
						<Grid item>
							<Typography variant="h4" color="textSecondary" fontWeight={500}>
								{intl.formatMessage({ id: 'home.footer.language' })}
							</Typography>
						</Grid>

						<Grid item>
							<LanguagePicker />
						</Grid>
					</Grid>
				</Hidden>
			</Grid>
		</footer>
	)
}

export default Footer
