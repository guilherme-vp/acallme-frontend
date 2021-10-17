import React from 'react'

import { Grid } from '@mui/material'

import { Agenda } from 'parts/Agenda'

export const Schedule = () => {
	const handleScheduleClick = (scheduleId: number) => {
		console.log(`Id: ${scheduleId}`)
	}

	return (
		<Grid container>
			<Grid container item spacing={3} mt={0}>
				<Agenda onClick={handleScheduleClick} patientId={0} specialistId={0} />
			</Grid>
		</Grid>
	)
}

export default Schedule
