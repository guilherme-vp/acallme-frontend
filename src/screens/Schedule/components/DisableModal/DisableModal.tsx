import React from 'react'

import { Grid, Typography } from '@mui/material'

import { useIntl } from 'hooks'
import { Modal } from 'parts/Modal'

export interface DisableModalProps {
	date: Date
	open: boolean
	loading: boolean
	onDisable: (date: Date) => void
	handleClose: () => void
}

export const DisableModal = ({
	date,
	open,
	loading,
	handleClose,
	onDisable
}: DisableModalProps) => {
	const intl = useIntl()

	return (
		<Modal
			open={open}
			onClose={handleClose}
			okLoading={loading}
			footer={{ cancelButton: false, finishButton: true }}
			okButtonProps={{ color: 'error', size: 'small' }}
			title={intl.formatMessage({ id: 'schedule.disableModal.title' })}
			onOk={() => onDisable(date)}
			okText={intl.formatMessage({ id: 'disable' })}
			maxWidth="xs"
			size="normal"
			dialogProps={{ fullWidth: true }}
		>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography variant="body1">
						{intl.formatMessage({ id: 'schedule.disableModal.desc' })}
					</Typography>
				</Grid>
			</Grid>
		</Modal>
	)
}

export default DisableModal
