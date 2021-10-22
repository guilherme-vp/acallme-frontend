import React from 'react'

import { Grid, Avatar, Typography } from '@mui/material'
import { format } from 'date-fns'

import { dateFormat } from 'constants/date-format'
import { useIntl } from 'hooks'
import { Modal } from 'parts/Modal'
import { User } from 'services/entities'
import { getInitials } from 'utils/get-initials'

export interface ConfirmationModalProps {
	user: Pick<User, 'id' | 'avatarUrl' | 'name'>
	scheduleId: number
	date: Date
	open: boolean
	loading: boolean
	onConfirm: (scheduleId: number, confirmation: boolean) => void
	handleClose: () => void
}

export const ConfirmationModal = ({
	user,
	scheduleId,
	date,
	open,
	loading,
	handleClose,
	onConfirm
}: ConfirmationModalProps) => {
	const intl = useIntl()

	return (
		<Modal
			maxWidth="md"
			open={open}
			onClose={handleClose}
			cancelText={intl.formatMessage({ id: 'reject' })}
			okText={intl.formatMessage({ id: 'accept' })}
			showCloseButton
			okLoading={loading}
			footer
			okButtonProps={{ color: 'success' }}
			cancelButtonProps={{ color: 'error' }}
			title={intl.formatMessage({ id: 'schedule.confirmationModal.title' })}
			onOk={() => onConfirm(scheduleId, true)}
		>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				spacing={3}
				sx={{ marginY: '24px' }}
			>
				<Grid item>
					<Avatar sx={{ width: '96px', height: '96px' }} src={user.avatarUrl}>
						{getInitials(user.name)}
					</Avatar>
				</Grid>
				<Grid container item spacing={1} justifyContent="center">
					<Grid item xs={12}>
						<Typography fontWeight={600} variant="h3" textAlign="center">
							{user.name}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h4" textAlign="center" color="text.secondary">
							{intl.formatMessage(
								{ id: 'schedule.to' },
								{ date: format(date, dateFormat) }
							)}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Modal>
	)
}

export default ConfirmationModal
