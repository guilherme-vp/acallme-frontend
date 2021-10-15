import React from 'react'

import { Chip, Grid, Icon, Typography } from '@mui/material'
import faker from 'faker'
import { MdOutlineShareLocation as PinIcon } from 'react-icons/md'

import { useIntl } from 'hooks'
import { getInitials } from 'utils/get-initials'

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
						<Grid container item>
							<Grid item xs={12}>
								<Typography variant="body1" fontWeight={600}>
									{name}
								</Typography>
							</Grid>
							<Grid item xs={12} mb={1}>
								<Typography variant="body2" sx={{ color: 'text.secondary' }}>
									{role}
								</Typography>
							</Grid>
							<Grid container item xs={12} alignItems="center">
								<Icon fontSize="small" sx={{ mr: 1 }}>
									<PinIcon />
								</Icon>
								<Typography variant="body2">{location}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container item mt={1} spacing={1}>
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
				<Grid container item spacing={1} mt={1}>
					<Grid item xs={12} sm={5}>
						<Typography variant="h5" fontWeight={600} textAlign="center">
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
