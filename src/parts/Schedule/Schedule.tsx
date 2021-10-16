import React, { useState, useEffect } from 'react'

import { Button, Grid, IconButton, Theme, Typography, useMediaQuery } from '@mui/material'
import { differenceInYears, addWeeks, subWeeks } from 'date-fns'
import { differenceInWeeks } from 'date-fns/esm'
import { MdArrowBack as PrevIcon, MdArrowForward as NextIcon } from 'react-icons/md'

import { useIntl } from 'hooks'

import { getWeek, WeekState } from './date.utils'

export interface ScheduleProps {
	onClick: (scheduleId: number) => void
	specialistId: number
	patientId: number
}

export const Schedule = ({ onClick, patientId, specialistId }: ScheduleProps) => {
	const now = new Date()
	const intl = useIntl()
	const [date, setDate] = useState(now)
	const [week, setWeek] = useState<WeekState>(
		getWeek({ date, patientId, specialistId, locale: intl.locale })
	)
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	const isPrevDisabled = differenceInWeeks(now, date) <= 0
	const isNextDisabled = differenceInYears(now, addWeeks(date, 1)) <= 0

	useEffect(() => {
		setWeek(getWeek({ date, patientId, specialistId, locale: intl.locale }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date])

	function handleNextWeek() {
		const newWeek = addWeeks(date, 1)

		setDate(newWeek)
	}

	function handlePrevWeek() {
		const newWeek = subWeeks(date, 1)

		setDate(newWeek)
	}

	return (
		<Grid container>
			<Grid container item justifyContent="space-between">
				<Grid item>
					<Typography variant="display3">Book Session</Typography>
				</Grid>
				<Grid
					container
					item
					justifyContent={isMdDown ? 'center' : 'flex-start'}
					xs={12}
					md="auto"
					spacing={2}
				>
					<Grid item>
						<Typography variant="display3">{week.selector}</Typography>
					</Grid>
					<Grid item>
						<IconButton onClick={() => handlePrevWeek()} disabled={isPrevDisabled}>
							<PrevIcon />
						</IconButton>
						<IconButton onClick={() => handleNextWeek()} disabled={isNextDisabled}>
							<NextIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
			<Grid container item>
				<table>
					{week.schedule.map(({ title, desc, ranges }) => (
						<>
							<th>
								{title}
								<br />
								{desc}
							</th>
							{ranges.map(({ hour, isDisabled, isScheduled, scheduleId }) => (
								<td key={scheduleId}>
									<Button
										onClick={() => onClick(scheduleId)}
										disabled={isDisabled}
										variant="contained"
										color={isScheduled ? 'primary' : 'inherit'}
									>
										{hour}
									</Button>
								</td>
							))}
						</>
					))}
				</table>
			</Grid>
		</Grid>
	)
}

export default Schedule
