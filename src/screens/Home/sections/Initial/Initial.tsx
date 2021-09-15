import React from 'react'
import { Button, Grid, Hidden, Typography } from '@material-ui/core'

import { useIntl } from 'hooks'
import { ContentBox } from 'components/ContentBox'
import doctorImage from 'assets/images/pointing-doctor.png'

import { FullPageSection } from '../../components/Section'
import { Image } from '../../components/Image'

export const Initial = () => {
	const intl = useIntl()

	return (
		<FullPageSection id="Home">
			<Grid container justifyContent="space-between">
				<Grid container item md xs={12} alignItems="center">
					<div>
						<Grid container spacing={3}>
							<Grid container item spacing={1}>
								<Grid item xs={12}>
									<Typography variant="display1">
										{intl.formatMessage({ id: 'home.section.initial.title' })}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="h3" color="textSecondary" fontWeight={500}>
										{intl.formatMessage({ id: 'home.section.initial.description' })}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" sx={{ fontWeight: 600 }}>
									{intl.formatMessage({ id: 'home.section.initial.appointment' })}
								</Button>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Hidden mdDown>
					<Grid container item md xs={12} justifyContent="center" alignItems="flex-end">
						<Image src={doctorImage} alt="initial-pointing-doctor" loading="lazy" />
					</Grid>
				</Hidden>
				<Grid container item>
					<ContentBox />
				</Grid>
			</Grid>
		</FullPageSection>
	)
}

export default Initial
