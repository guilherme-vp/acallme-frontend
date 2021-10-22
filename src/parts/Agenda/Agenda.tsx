import React, { useState } from 'react'

import { Grid, IconButton, Typography } from '@mui/material'
import { differenceInYears, addWeeks, subWeeks, differenceInDays } from 'date-fns'
import { MdArrowBack as PrevIcon, MdArrowForward as NextIcon } from 'react-icons/md'

import { useSchedule } from 'hooks/useSchedule'

import { BookButton, Table, TBody, TData } from './Agenda.styled'

export interface AgendaProps {
	onClick: (id: number, day: Date) => void
}

export const Agenda = ({ onClick }: AgendaProps) => {
	const now = new Date()
	const [date, setDate] = useState(now)
	const isPrevDisabled = differenceInDays(date, now) <= 7
	const isNextDisabled = differenceInYears(now, addWeeks(date, 1)) > 0
	const { schedule, selector } = useSchedule(date)

	function handleNextWeek() {
		const newWeek = addWeeks(date, 1)

		setDate(newWeek)
	}

	function handlePrevWeek() {
		const newWeek = subWeeks(date, 1)

		setDate(newWeek)
	}

	return (
		<>
			<Grid container item justifyContent="flex-end" spacing={2} alignItems="center">
				<Grid item>
					<Typography variant="h2" fontWeight={600}>
						{selector}
					</Typography>
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
							{schedule.weeks.map(({ title, desc }) => (
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
						{schedule.hours.map((hourRanges, index) => (
							<tr key={index}>
								{hourRanges.map(
									({ day, hour, isDisabled, isScheduled, isConfirmed, scheduleId }) => (
										<TData key={scheduleId}>
											<BookButton
												onClick={() => onClick(scheduleId ?? day.getTime(), day)}
												disabled={isDisabled}
												isScheduled={isScheduled}
												isConfirmed={isConfirmed}
												variant={isScheduled ? 'contained' : 'text'}
												color="inherit"
											>
												{isDisabled ? <s>{hour}</s> : hour}
											</BookButton>
										</TData>
									)
								)}
							</tr>
						))}
					</TBody>
				</Table>
			</Grid>
		</>
	)
}

export default Agenda
