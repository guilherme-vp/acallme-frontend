import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import { useIntl } from 'hooks'

import heart from 'assets/icons/heart.png'
import videoChat from 'assets/icons/video-chat.png'
import schedule from 'assets/icons/schedule.png'
import smiley from 'assets/icons/smiley.png'
// import lock from 'assets/icons/lock.png'

import { FullPageSection } from '../../components/Section'
import { Icon } from '../../components/Icon'
import { ServicesModel } from './Services.models'

export const services: ServicesModel[] = [
	{
		icon: videoChat,
		alt: 'teleconsultation-service'
	},
	{
		icon: schedule,
		alt: 'scheduling-service'
	},
	{
		icon: heart,
		alt: 'record-service'
	},
	{
		icon: smiley,
		alt: 'chatbot-service'
	}
	// {
	// icon: lock,
	// alt: 'security-service'
	// }
]

export const Services = () => {
	const intl = useIntl()

	return (
		<FullPageSection id="Services">
			<Grid container>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid item xs={12} md={7}>
						<Typography variant="display1">
							{intl.formatMessage({ id: 'home.section.services.title' })}
						</Typography>
					</Grid>
					<Grid item xs={12} md>
						<Typography variant="h3" color="textSecondary" fontWeight={500}>
							{intl.formatMessage({ id: 'home.section.services.description' })}
						</Typography>
					</Grid>
				</Grid>
				<Grid container mt={5} justifyContent="center">
					{services.map(({ alt, icon }, index) => (
						<Grid key={alt} container item xs={6} md={3} spacing={1} padding={2}>
							<Grid item xs={12}>
								<Icon src={icon} alt={alt} />
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h4" fontWeight={600}>
									{intl.formatMessage({
										// @ts-ignore
										id: `home.section.services.service.${index + 1}.title`
									})}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h5" color="textSecondary">
									{intl.formatMessage({
										// @ts-ignore
										id: `home.section.services.service.${index + 1}.description`
									})}
								</Typography>
							</Grid>
						</Grid>
					))}
				</Grid>
			</Grid>
		</FullPageSection>
	)
}

export default Services
