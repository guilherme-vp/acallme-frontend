import React, { useState } from 'react'

import { Grid, Input } from '@mui/material'
import { AiOutlineSend as SendIcon } from 'react-icons/ai'

import { useIntl } from 'hooks'

import * as S from './ChatSender.styled'

export interface ChatSenderProps {
	onSend: (content: string) => void
}

export const ChatSender = ({ onSend }: ChatSenderProps) => {
	const intl = useIntl()
	const [message, setMessage] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const { value } = e.target

		setMessage(value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		onSend(message)
		setMessage('')
	}

	return (
		<form onSubmit={handleSubmit} noValidate>
			<Grid container alignItems="center" spacing={2}>
				<Grid item xs>
					<Input
						fullWidth
						placeholder={intl.formatMessage({ id: 'chat.placeholder' })}
						name="chat"
						type="text"
						onChange={handleChange}
						value={message}
						required
						sx={{
							borderRadius: '12px',
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
