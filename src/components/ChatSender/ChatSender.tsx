import React from 'react'

import { Grid, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { AiOutlineSend as SendIcon } from 'react-icons/ai'

import { useIntl } from 'hooks'

import * as S from './ChatSender.styled'

export interface ChatSenderProps {
	onSend: (content: string) => void
}

export const ChatSender = ({ onSend }: ChatSenderProps) => {
	const intl = useIntl()
	const {
		register,
		handleSubmit,
		clearErrors,
		reset,
		formState: { errors }
	} = useForm<{ message: string }>({
		mode: 'all'
	})

	const onSubmit = handleSubmit((data: { message: string }) => {
		onSend(data.message)
		clearErrors()
		reset()
	})

	return (
		<form onSubmit={onSubmit} noValidate>
			<Grid container alignItems="center" spacing={2}>
				<Grid item xs>
					<TextField
						{...register('message', { required: true, maxLength: 1000 })}
						fullWidth
						placeholder={intl.formatMessage({ id: 'chat.placeholder' })}
						required
						error={!!errors.message}
						sx={{
							borderRadius: '16px',
							backgroundColor: theme => theme.palette.background.default
						}}
					/>
				</Grid>
				<Grid item>
					<S.SubmitButton type="submit" variant="contained">
						<SendIcon />
					</S.SubmitButton>
				</Grid>
			</Grid>
		</form>
	)
}

export default ChatSender
