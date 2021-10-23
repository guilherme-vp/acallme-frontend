import React from 'react'

import { Grid, Avatar, Typography } from '@mui/material'
import { format } from 'date-fns'

import { dateFormat } from 'constants/date-format'
import { useIntl } from 'hooks'
import { Modal } from 'parts/Modal'
import { User } from 'services/entities'
import { getInitials } from 'utils/get-initials'

export interface DetailsModalProps {
	user: Pick<User, 'id' | 'avatarUrl' | 'name'>
	date: Date
	open: boolean
	handleClose: () => void
}

export const DetailsModal = ({ user, date, open, handleClose }: DetailsModalProps) => {
	const intl = useIntl()

	return (
		<Modal maxWidth="md" open={open} onClose={handleClose} showCloseButton footer={false}>
			<Grid
				container
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				spacing={3}
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

export default DetailsModal
