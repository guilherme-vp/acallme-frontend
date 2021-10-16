import React, { useState, useEffect } from 'react'

import { Container, Grid, IconButton, Typography } from '@mui/material'
import { differenceInYears, addWeeks, subWeeks, differenceInDays } from 'date-fns'
import { MdArrowBack as PrevIcon, MdArrowForward as NextIcon } from 'react-icons/md'

import { useIntl } from 'hooks'

import { BookButton, Table, TBody } from './Schedule.styled'
import { getWeek, ScheduleContent } from './date.utils'

export interface ScheduleProps {
	onClick: (scheduleId: number) => void
	specialistId: number
	patientId: number
}

export const Schedule = ({ onClick, patientId, specialistId }: ScheduleProps) => {
	const now = new Date()
	const intl = useIntl()
	const [date, setDate] = useState(now)
	const [week, setWeek] = useState<ScheduleContent>(
		getWeek({ date, patientId, specialistId, locale: intl.locale })
	)
	const isPrevDisabled = differenceInDays(date, now) <= 7
	const isNextDisabled = differenceInYears(now, addWeeks(date, 1)) > 0

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
		<Grid container justifyContent="center">
			<Container maxWidth="md">
				<Grid container item>
					<Typography variant="display3">Book Session</Typography>
				</Grid>
				<Grid container item justifyContent="flex-end" spacing={2}>
					<Grid item>
						<Typography variant="display3">{week.selector}</Typography>
					</Grid>
					<Grid item>
						<IconButton
							onClick={() => handlePrevWeek()}
							disabled={isPrevDisabled}
							color="primary"
							disableRipple
						>
							<PrevIcon />
						</IconButton>
						<IconButton
							onClick={() => handleNextWeek()}
							disabled={isNextDisabled}
							color="primary"
							disableRipple
						>
							<NextIcon />
						</IconButton>
					</Grid>
				</Grid>
				<Grid container justifyContent="center">
					<Table>
						<thead>
							<tr>
								{week.schedule.weeks.map(({ title, desc }) => (
									<th key={title}>
										<Typography fontWeight={700} color="secondary" variant="body1">
											{title}
										</Typography>
										<Typography fontWeight={600} color="text.secondary" variant="h5">
											{desc}
										</Typography>
									</th>
								))}
							</tr>
						</thead>
						<TBody>
							{week.schedule.hours.map((hourRanges, index) => (
								<tr key={index}>
									{hourRanges.map(({ hour, isDisabled, isScheduled, scheduleId }) => (
										<td key={scheduleId}>
											<BookButton
												onClick={() => onClick(scheduleId)}
												disabled={isDisabled}
												isScheduled={isScheduled}
												variant={isScheduled ? 'contained' : 'text'}
												color="inherit"
											>
												{isDisabled ? <s>{hour}</s> : hour}
											</BookButton>
										</td>
									))}
								</tr>
							))}
						</TBody>
					</Table>
				</Grid>
			</Container>
		</Grid>
	)
}

export default Schedule
