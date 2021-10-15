import React from 'react'

import { Grid, Typography } from '@mui/material'
import faker from 'faker'

import { SpecialistCard } from 'components/SpecialistCard'
import { useIntl } from 'hooks'

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
		specializations: Array(faker.datatype.number({ min: 1, max: 10 }))
			.fill(null)
			.map(() => faker.name.jobType())
	}))

export const Dashboard = () => {
	const intl = useIntl()

	return (
		<Grid container spacing={1}>
			<Grid item>
				<Typography variant="display2">
					{intl.formatMessage(
						{ id: 'dashboard.welcome' },
						{ name: faker.name.firstName() }
					)}
				</Typography>
			</Grid>
			<Grid container item spacing={1}>
				{mock.map(value => (
					<Grid item key={value.id}>
						{/* @ts-ignore */}
						<SpecialistCard {...value} />
					</Grid>
				))}
			</Grid>
		</Grid>
	)
}

export default Dashboard
