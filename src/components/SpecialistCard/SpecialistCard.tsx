import React from 'react'

import { Chip, Grid, Icon, Typography } from '@mui/material'
import faker from 'faker'
import { GoLocation as PinIcon } from 'react-icons/go'

import { useIntl } from 'hooks'
import { getInitials } from 'utils/get-initials'
import { pxToRem } from 'utils/px-to-rem'

import { BookButton, CardContainer, MiniAvatar } from './SpecialistCard.styled'

export interface SpecialistCardProps {
	id: number
	name: string
	role: string
	location: string
	specializations: string[]
	avatar: string | null
	cost: number
	onBook: (id: number) => void
}

export const SpecialistCard = ({
	id,
	name,
	role,
	location,
	specializations,
	avatar,
	cost,
	onBook
}: SpecialistCardProps) => {
	const intl = useIntl()
	const totalSpecializations = specializations.length
	const slicedSpecializations = specializations.slice(0, 5)

	return (
		<CardContainer>
			<Grid container spacing={1}>
				<Grid container item justifyContent="space-between" spacing={2}>
					<Grid item>
						<MiniAvatar src={avatar || faker.image.people(48, 48)} alt={`${name}-booking`}>
							{getInitials(name)}
						</MiniAvatar>
					</Grid>
					<Grid container item xs justifyContent="center">
						<Grid container item spacing={0.5}>
							<Grid item xs={12}>
								<Typography variant="body1" fontWeight={600}>
									{name}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant="h5" sx={{ color: 'text.secondary' }}>
									{role}
								</Typography>
							</Grid>
							<Grid container item xs={12}>
								<Icon sx={{ mr: 0.5, fontSize: pxToRem(16) }}>
									<PinIcon />
								</Icon>
								<Typography variant="body2">{location}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container item spacing={1} mt={0.5} sx={{ height: '72px' }}>
					{slicedSpecializations.map((value, index) => (
						<Grid item key={index}>
							<Chip size="small" label={value} />
						</Grid>
					))}
					{totalSpecializations > slicedSpecializations.length && (
						<Grid item>
							<Chip
								size="small"
								label={`${totalSpecializations - 5}+`}
								variant="outlined"
							/>
						</Grid>
					)}
				</Grid>
				<Grid container item spacing={1} mt={0.5} alignItems="center">
					<Grid item xs={12} sm={5}>
						<Typography variant="h3" fontWeight={600} textAlign="center">
							${intl.formatNumber(cost, { currencySign: 'standard' })}/h
						</Typography>
					</Grid>
					<Grid container item xs={12} sm>
						<BookButton fullWidth onClick={() => onBook(id)} variant="contained">
							{intl.formatMessage({ id: 'dashboard.card.book' })}
						</BookButton>
					</Grid>
				</Grid>
			</Grid>
		</CardContainer>
	)
}

export default SpecialistCard
