import React from 'react'
import { Button, Grid, Hidden, Typography } from '@material-ui/core'

import { useIntl } from 'hooks'
import { chunkArray } from 'utils/chunk-array'
import { ListGlow } from 'components/ListGlow'

import psychologistImage from 'assets/images/psychologist.png'
import { FullPageSection } from '../../components/Section'
import { Image } from '../../components/Image'

export const About = () => {
	const intl = useIntl()
	const bullets = chunkArray(
		Array(4)
			.fill({})
			.map((_, index) => index + 1),
		2
	)

	return (
		<FullPageSection id="About">
			<Grid container justifyContent="space-between" direction="row-reverse">
				<Grid container item md xs={12} alignItems="center">
					<div>
						<Grid container spacing={3}>
							<Grid container item spacing={1}>
								<Grid item xs={12}>
									<Typography variant="display1">
										{intl.formatMessage({ id: 'home.section.about.title' })}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="h4" color="textSecondary" fontWeight={500}>
										{intl.formatMessage({ id: 'home.section.about.description' })}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="h4" color="textSecondary" fontWeight={500}>
										{intl.formatMessage({ id: 'home.section.about.description.2' })}
									</Typography>
								</Grid>
							</Grid>
							<Grid container item>
								{bullets.map((eachArr, index) => (
									<Grid item xs key={index}>
										<ListGlow>
											{eachArr.map(bulletNumber => (
												<li key={bulletNumber}>
													<Typography variant="body1" fontWeight={500} display="inline">
														{intl.formatMessage({
															// @ts-ignore
															id: `home.section.about.bullet.${String(bulletNumber)}`
														})}
													</Typography>
												</li>
											))}
										</ListGlow>
									</Grid>
								))}
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" sx={{ fontWeight: 600 }}>
									{intl.formatMessage({ id: 'home.section.about.learnMore' })}
								</Button>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Hidden mdDown>
					<Grid container item md xs={12} justifyContent="center" alignItems="flex-end">
						<Image src={psychologistImage} alt="about-psychologist" loading="lazy" />
					</Grid>
				</Hidden>
			</Grid>
		</FullPageSection>
	)
}

export default About
