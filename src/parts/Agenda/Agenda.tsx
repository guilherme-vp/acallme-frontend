import React, { useState } from 'react'

import { Divider, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import {
	differenceInYears,
	addWeeks,
	subWeeks,
	differenceInDays,
	set,
	startOfWeek,
	endOfWeek
} from 'date-fns'
import { MdArrowBack as PrevIcon, MdArrowForward as NextIcon } from 'react-icons/md'
import { useQuery } from 'react-query'

import { BookButton } from 'components/BookButton'
import { useIntl, useStoreon } from 'hooks'
import { dayEnds, dayStart, HoursRange, useSchedule } from 'hooks/useSchedule'
import { fetchSchedules } from 'services/api/schedule'
import { RolesEnum } from 'services/entities'

import { Table, TBody, TData } from './Agenda.styled'

export interface AgendaProps {
	role: RolesEnum
	onViewDetails: (id: number) => void
	onConfirm: (id: number) => void
	onDisable: (date: Date) => void
}

export const Agenda = ({ role, onConfirm, onDisable, onViewDetails }: AgendaProps) => {
	const now = new Date()
	const [date, setDate] = useState(now)
	const { user } = useStoreon('user')
	const intl = useIntl()
	const [chosen, setChosen] = useState<Omit<HoursRange, 'hour'>>()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const isPrevDisabled = differenceInDays(date, now) <= 7
	const isNextDisabled = differenceInYears(now, addWeeks(date, 1)) > 0

	const firstDay = startOfWeek(date, { weekStartsOn: 1 })
	const lastDay = endOfWeek(date, { weekStartsOn: 1 })

	const { data, refetch } = useQuery(
		'schedules',
		() => {
			if (role === RolesEnum.Specialist && user) {
				return fetchSchedules({
					specialistId: user.id,
					rangeStart: set(firstDay, { hours: dayStart }).toISOString(),
					rangeEnd: set(lastDay, { hours: dayEnds }).toISOString()
				})
			}
			if (role === RolesEnum.Patient && user) {
				return fetchSchedules({
					patientId: user.id,
					rangeStart: set(firstDay, { hours: dayStart }).toISOString(),
					rangeEnd: set(lastDay, { hours: dayEnds }).toISOString()
				})
			}
		},
		{ refetchIntervalInBackground: true }
	)
	const { schedule, selector } = useSchedule(data, date)

	function handleNextWeek() {
		const newWeek = addWeeks(date, 1)

		setDate(newWeek)
	}

	function handlePrevWeek() {
		const newWeek = subWeeks(date, 1)

		setDate(newWeek)
	}

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		input: Omit<HoursRange, 'hour'>
	) => {
		setAnchorEl(event.currentTarget)
		setChosen(input)
	}
	const handleClose = () => {
		setAnchorEl(null)
		refetch()
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
												onClick={e =>
													handleClick(e, {
														isDisabled,
														isScheduled,
														isConfirmed,
														scheduleId,
														day
													})
												}
												disabled={isDisabled}
												isScheduled={isScheduled}
												isConfirmed={isConfirmed}
												variant={isScheduled ? 'contained' : 'text'}
												color="inherit"
												aria-expanded={open ? 'true' : undefined}
											>
												{isDisabled ? <s>{hour}</s> : hour}
											</BookButton>
										</TData>
									)
								)}
							</tr>
						))}
						<Menu
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
						>
							{chosen && !chosen.isDisabled && chosen.isScheduled && chosen.scheduleId && (
								<MenuItem onClick={() => onViewDetails(chosen.scheduleId as number)}>
									{intl.formatMessage({ id: 'schedule.viewData' })}
								</MenuItem>
							)}
							{chosen && role === RolesEnum.Specialist && (
								<div>
									<Divider sx={{ my: 0.5 }} />
									{!chosen.isConfirmed && !chosen.isDisabled && (
										<>
											{chosen.isScheduled && chosen.scheduleId ? (
												<MenuItem onClick={() => onConfirm(chosen.scheduleId as number)}>
													{intl.formatMessage({ id: 'confirm' })}
												</MenuItem>
											) : (
												<MenuItem onClick={() => onDisable(chosen.day)}>
													{intl.formatMessage({ id: 'disable' })}
												</MenuItem>
											)}
										</>
									)}
								</div>
							)}
						</Menu>
					</TBody>
				</Table>
			</Grid>
		</>
	)
}

export default Agenda
