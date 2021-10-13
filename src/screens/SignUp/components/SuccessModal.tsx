import React from 'react'

import { Grid, Typography, Button, SvgIcon } from '@mui/material'
import { RiStarSmileLine as StarIcon } from 'react-icons/ri'

import { useIntl } from 'hooks'
import { Modal } from 'parts/Modal'
import { capitalizeLetter } from 'utils/capitalize-letter'
import { pxToRem } from 'utils/px-to-rem'

interface SuccessProps {
	open: boolean
	onClose: () => void
}

export const SuccessModal = ({ onClose, open }: SuccessProps) => {
	const intl = useIntl()
	return (
		<Modal
			open={open}
			footer={false}
			showCloseButton
			maxWidth="sm"
			onOk={onClose}
			onClose={onClose}
		>
			<Grid container justifyContent="center" spacing={2}>
				<Grid item xs={12}>
					<SvgIcon sx={{ fontSize: pxToRem(24) }}>
						<StarIcon />
					</SvgIcon>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h5" fontWeight={500}>
						{intl.formatMessage({ id: 'signup.modal.success.title' })}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="body1">
						{intl.formatMessage({ id: 'signup.modal.success.description' })}
					</Typography>
				</Grid>
				<Grid item xs={12} sx={{ mt: 1 }}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							onClose()
						}}
					>
						{capitalizeLetter(intl.formatMessage({ id: 'start' }))}
					</Button>
				</Grid>
			</Grid>
		</Modal>
	)
}
