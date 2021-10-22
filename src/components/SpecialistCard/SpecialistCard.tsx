import React from 'react'

import { Chip, Grid, Typography } from '@mui/material'

import { useIntl } from 'hooks'
import { Specialty } from 'services/entities'
import { getInitials } from 'utils/get-initials'

import { BookButton, CardContainer, MiniAvatar } from './SpecialistCard.styled'

export interface SpecialistCardProps {
	id: number
	name: string
	specialties?: Specialty[]
	avatarUrl?: string
	cost: number
	onBook: (id: number) => void
}

export const SpecialistCard = ({
	id,
	name,
	specialties = [],
	avatarUrl,
	cost,
	onBook
}: SpecialistCardProps) => {
	const intl = useIntl()
	const totalSpecialties = specialties.length
	const slicedSpecialties = specialties.slice(0, 5)

	return (
		<CardContainer>
			<Grid container spacing={1}>
				<Grid container item justifyContent="space-between" alignItems="center" spacing={2}>
					<Grid item>
						<MiniAvatar src={avatarUrl} alt={`${name}-booking`}>
							{getInitials(name)}
						</MiniAvatar>
					</Grid>
					<Grid container item xs justifyContent="center">
						<Typography variant="body1" fontWeight={600} textAlign="center">
							{name}
						</Typography>
					</Grid>
				</Grid>
				<Grid container item spacing={1} mt={0.5} sx={{ minHeight: '0' }}>
					{slicedSpecialties.map(value => (
						<Grid item key={value.id}>
							<Chip size="small" label={value.name} />
						</Grid>
					))}
					{totalSpecialties > slicedSpecialties.length && (
						<Grid item>
							<Chip size="small" label={`${totalSpecialties - 5}+`} variant="outlined" />
						</Grid>
					)}
				</Grid>
				<Grid container item spacing={1} alignItems="center" sx={{ marginTop: '4px' }}>
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
