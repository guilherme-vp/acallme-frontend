import React from 'react'

import { Grid, Typography } from '@mui/material'
import faker from 'faker'

import { SpecialistCard } from 'components/SpecialistCard'
import { useIntl } from 'hooks'
import { Search } from 'parts/Search'

import { SearchContainer } from './Specialists.styled'

const mock = Array(9)
	.fill(null)
	.map(() => ({
		id: faker.datatype.number(),
		avatar: faker.image.people(),
		cost: +faker.finance.amount(100, 1000),
		location: faker.name.jobType(),
		name: faker.name.findName(),
		onBook: () => {},
		role: faker.name.jobType(),
		specialties: Array(faker.datatype.number({ min: 1, max: 10 }))
			.fill(null)
			.map(() => faker.name.jobType())
	}))

export const Specialists = () => {
	const intl = useIntl()

	return (
		<Grid container>
			<Grid item mb={3}>
				<Typography variant="display2">
					{intl.formatMessage(
						{ id: 'dashboard.welcome' },
						{ name: faker.name.firstName() }
					)}
				</Typography>
			</Grid>
			<Grid container>
				<SearchContainer>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Typography
								variant="body1"
								color="text.secondary"
								fontWeight={600}
								sx={{ maxWidth: '600px' }}
							>
								{intl.formatMessage({ id: 'dashboard.findTheBest' })}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Search loading={false} onSearch={() => {}} onSearchInputChange={() => {}} />
						</Grid>
					</Grid>
				</SearchContainer>
			</Grid>

			<Grid container mt={3}>
				<Grid item xs={12}>
					<Typography variant="h1" color="text.primary">
						{intl.formatMessage({ id: 'dashboard.forYou' })}
					</Typography>
				</Grid>
				<Grid container item spacing={3} mt={0}>
					{mock.map(value => (
						<Grid item key={value.id} xs={12} sm="auto">
							<SpecialistCard {...value} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Specialists
