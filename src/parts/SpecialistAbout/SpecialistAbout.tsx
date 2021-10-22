import React, { useState, useEffect } from 'react'

import { CalendarPicker } from '@mui/lab'
import {
	AppBar,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
	Grid,
	Divider,
	Stack,
	Chip,
	Container,
	CircularProgress,
	Button
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { addHours, endOfDay, startOfDay, subHours } from 'date-fns'
import {
	MdClose as CloseIcon,
	MdOutlinePhone as PhoneIcon,
	MdOutlineMail as MailIcon
} from 'react-icons/md'
import { useQuery, useMutation } from 'react-query'

import { BookButton } from 'components/BookButton'
import { useIntl } from 'hooks'
import { HoursRange } from 'hooks/useSchedule'
import { createSchedule, fetchSchedules } from 'services/api/schedule'
import { Schedule, Specialist } from 'services/entities'
import { formatHours } from 'utils/get-all-hours'
import { getInitials } from 'utils/get-initials'

import * as S from './SpecialistAbout.styled'

export interface SpecialistAboutProps {
	open: boolean
	handleClose: () => void
	specialist: Omit<
		Specialist,
		'gender' | 'crp' | 'crm' | 'cpf' | 'cnpj' | 'birth' | 'schedule'
	>
	userId: number
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="left" ref={ref} {...props} />
})

const minDate = new Date()

export const SpecialistAbout = ({
	specialist,
	handleClose,
	open,
	userId
}: SpecialistAboutProps) => {
	const intl = useIntl()
	const [date, setDate] = useState<Date | null>(null)
	const [chosenDay, setChosenDay] = useState<Date>()

	const { data, isLoading, refetch } = useQuery('schedules', () =>
		fetchSchedules({
			specialistId: specialist.id,
			disabled: false,
			confirmed: false,
			rangeStart: addHours(startOfDay(date ?? minDate), 6).toISOString(),
			rangeEnd: subHours(endOfDay(date ?? minDate), 3).toISOString()
		})
	)
	const { data: creationData, mutate } = useMutation(createSchedule)
	const [hours, setHours] = useState<HoursRange[]>()

	useEffect(() => {
		refetch()

		if (data) {
			setHours(formatHours(data as Schedule[], date ?? minDate))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date])

	if (isLoading || !data) {
		return <CircularProgress />
	}

	const handleClick = (day: Date) => {
		setChosenDay(day)
	}

	const createAppointment = () => {
		const a = 'oi'
	}

	return (
		<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative', border: 0 }}>
				<Toolbar>
					<IconButton edge="start" color="primary" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 3 }} variant="h5" color="primary">
						{intl.formatMessage({ id: 'back' })}
					</Typography>
				</Toolbar>
			</AppBar>

			<Container maxWidth="sm">
				<Grid container spacing={3} alignItems="center" flexDirection="column">
					<Grid item>
						<S.BigAvatar src={specialist.avatarUrl}>
							{getInitials(specialist.name)}
						</S.BigAvatar>
					</Grid>
					<Grid item>
						<Typography textAlign="center" variant="h1" fontWeight={700}>
							{specialist.name}
						</Typography>
					</Grid>
					<Grid item>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Stack direction="row" spacing={1} alignItems="center">
								<MailIcon />
								<Typography
									sx={{ marginLeft: '8px' }}
									variant="body1"
									color="text.secondary"
								>
									{specialist.email}
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<PhoneIcon />
								<Typography
									sx={{ marginLeft: '8px' }}
									variant="body1"
									color="text.secondary"
								>
									{specialist.phone}
								</Typography>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
				<Grid item xs={12} sx={{ width: '100%', marginTop: 2 }}>
					<Divider flexItem />
				</Grid>
				<Grid container item spacing={3} sx={{ mt: 1 }}>
					<Grid container item alignItems="center" flexDirection="column" spacing={1}>
						<Grid item>
							<Typography color="text.secondary" variant="h3">
								{intl.formatMessage({ id: 'signup.form.session.cost' })}
							</Typography>
						</Grid>
						<Grid item>
							<Typography textAlign="center" variant="display3" fontWeight={700}>
								${specialist.cost}/h
							</Typography>
						</Grid>
					</Grid>
					<Grid container item spacing={1}>
						<Grid item xs={12}>
							<Typography color="text.secondary" variant="h3">
								{intl.formatMessage({ id: 'specialist.specialties' })}
							</Typography>
						</Grid>
						<Grid container item spacing={2}>
							{specialist.specialties?.map(specialty => (
								<Grid item key={specialty.id}>
									<Chip label={specialty.name} />
								</Grid>
							))}
						</Grid>
					</Grid>
					<Grid container item spacing={1}>
						<Grid item xs={12}>
							<Typography color="text.secondary" variant="h3">
								{intl.formatMessage({ id: 'specialist.about' })}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h5">{specialist.about}</Typography>
						</Grid>
					</Grid>
					<Grid container item mt={1} spacing={2}>
						<Grid item xs={12}>
							<Typography variant="h4">
								{intl.formatMessage({ id: 'schedule.card.book' })}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<CalendarPicker
								date={date}
								onChange={newDate => (newDate ? setDate(newDate) : undefined)}
								minDate={minDate}
							/>
						</Grid>
						{hours && (
							<>
								<Grid item xs={12}>
									<Typography variant="body1">
										{intl.formatMessage({ id: 'schedule.card.hours' })}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									{hours?.map(({ day, hour, isDisabled, isScheduled, scheduleId }) => (
										<BookButton
											key={scheduleId ?? hour}
											onClick={() => handleClick(day)}
											disabled={isDisabled}
											isScheduled={isScheduled as boolean}
											variant={chosenDay === day ? 'contained' : 'text'}
											isChosen={chosenDay === day}
											color="inherit"
										>
											{isDisabled ? <s>{hour}</s> : hour}
										</BookButton>
									))}
								</Grid>
								<Grid item xs={12}>
									<Button
										disabled={!chosenDay}
										onClick={createAppointment}
										variant="contained"
										color="primary"
									>
										{intl.formatMessage({ id: 'schedule.card.book' })}
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				</Grid>
			</Container>
		</Dialog>
	)
}

export default SpecialistAbout
