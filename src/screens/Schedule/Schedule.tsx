import React, { useState } from 'react'

import { Grid, Container, Typography } from '@mui/material'
import { addHours } from 'date-fns'
import { useMutation } from 'react-query'
import { Redirect } from 'react-router'

import { useIntl, useStoreon } from 'hooks'
import { Agenda } from 'parts/Agenda'
import { LOGIN } from 'routes'
import { confirmSchedule, disableSchedule } from 'services/api/schedule'

import { ConfirmationModal } from './components/ConfirmationModal'
import { DetailsModal } from './components/DetailsModal'
import { DisableModal } from './components/DisableModal'

export const Schedule = () => {
	const { user, loading, role } = useStoreon('user', 'loading', 'role')

	const [schedule, setSchedule] = useState<{
		date: Date
		scheduleId?: number
		confirmed?: boolean
	}>({
		date: new Date()
	})

	const {
		data: disableData,
		isLoading: disableLoading,
		mutate: disableMutation
	} = useMutation('disableSchedule', disableSchedule)
	const {
		data: confirmData,
		isLoading: confirmLoading,
		mutate: confirmMutation
	} = useMutation('confirmSchedule', confirmSchedule)

	const [openConfirm, setOpenConfirm] = useState(false)
	const [openDisable, setOpenDisable] = useState(false)
	const [openDetails, setOpenDetails] = useState(false)
	const intl = useIntl()

	if (loading || !user) {
		return <Redirect to={LOGIN} />
	}

	const handleOpenDetails = (id: number) => {
		setSchedule({ ...schedule, scheduleId: id })
		setOpenDetails(true)
	}
	const handleCloseDetails = () => {
		setOpenDetails(false)
	}

	const handleOpenDisable = (date: Date) => {
		setOpenDisable(true)
		setSchedule({ date, scheduleId: undefined })
	}
	const handleCloseDisable = () => {
		setOpenDisable(false)
	}
	const handleDisable = (date: Date) => {
		disableMutation({
			dateStart: date.toISOString(),
			dateEnd: addHours(date, 1).toISOString()
		})
	}

	const handleOpenConfirm = (scheduleId: number) => {
		setOpenConfirm(true)
		setSchedule({ ...schedule, scheduleId })
	}
	const handleCloseConfirm = () => {
		setOpenConfirm(false)
	}
	const handleConfirm = (scheduleId: number, confirmation: boolean) => {
		confirmMutation({ scheduleId, confirmed: confirmation })
	}

	return (
		<Grid container>
			<Grid container item spacing={3} mt={0}>
				<Container maxWidth="lg">
					<Grid item xs={12}>
						<Typography variant="display2">
							{intl.formatMessage({ id: 'schedule' })}
						</Typography>
					</Grid>
					<Agenda
						onViewDetails={handleOpenDetails}
						onConfirm={handleOpenConfirm}
						onDisable={handleOpenDisable}
						role={role}
					/>
				</Container>
			</Grid>
			<ConfirmationModal
				date={schedule?.date}
				onConfirm={handleConfirm}
				open={openConfirm}
				handleClose={handleCloseConfirm}
				loading={confirmLoading}
				scheduleId={schedule.scheduleId as number}
				user={user}
			/>

			<DisableModal
				date={schedule?.date}
				onDisable={handleDisable}
				open={openDisable}
				handleClose={handleCloseDisable}
				loading={disableLoading}
			/>

			<DetailsModal
				date={schedule?.date}
				user={user}
				open={openDetails}
				handleClose={handleCloseDetails}
			/>
		</Grid>
	)
}

export default Schedule
