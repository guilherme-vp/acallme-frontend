import React from 'react'

import { useTheme } from 'styled-components'

import { Grid, Typography, Button } from '@mui/material'

import { SuccessStar } from 'assets/icons/SuccessStar'
import { useIntl } from 'hooks'
import { Modal } from 'parts/Modal'

interface SuccessProps {
	open: boolean
	onClose: () => void
}

export const SuccessModal = ({ onClose, open }: SuccessProps) => {
	const intl = useIntl()
	const theme = useTheme()
	return (
		<Modal
			open={open}
			footer={false}
			showCloseButton
			maxWidth="sm"
			onOk={onClose}
			onClose={onClose}
		>
			<Grid container flexDirection="column" alignItems="center" spacing={1}>
				<Grid item>
					<SuccessStar sx={{ fontSize: '10rem', color: theme.tags.yellow }} />
				</Grid>
				<Grid container item justifyContent="center">
					<Typography textAlign="center" variant="display2" fontWeight={700}>
						{intl.formatMessage({ id: 'signup.modal.success.title' })}
					</Typography>
				</Grid>
				<Grid item>
					<Typography color="GrayText" textAlign="center" variant="h4">
						{intl.formatMessage({ id: 'signup.modal.success.description' })}
					</Typography>
				</Grid>
				<Grid item sx={{ mt: 2 }}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							onClose()
						}}
					>
						{intl.formatMessage({ id: 'start' }).toUpperCase()}
					</Button>
				</Grid>
			</Grid>
		</Modal>
	)
}
