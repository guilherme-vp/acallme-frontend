/* eslint-disable react/jsx-wrap-multilines */
import React from 'react'

import {
	Typography,
	ListItemAvatar,
	ListItemText,
	Avatar,
	ListItem,
	IconButton
} from '@mui/material'
import * as datefns from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import {
	MdCheckCircleOutline as CheckIcon,
	MdRemoveCircleOutline as CloseIcon,
	MdOutlineSendToMobile as MobileIcon
} from 'react-icons/md'

import { dateFormat } from 'constants/date-format'
import { ILocale, useIntl } from 'hooks'
import { Notification } from 'services/entities'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { ActionContainer, ClockIcon } from './NotificationItem.styled'
import { renderAvatar } from './renderAvatar'

interface NotificationItemProps {
	notification: Notification
	handleConfirm: (id: string, appointmentId: number) => void
	handleReject: (id: string, appointmentId: number) => void
	handleEnter: (id: string, appointmentId: number) => void
}

export const NotificationItem = ({
	notification,
	handleConfirm,
	handleEnter,
	handleReject
}: NotificationItemProps) => {
	const {
		id,
		avatar,
		createdAt,
		appointmentId,
		name,
		when,
		type,
		isConfirmed,
		isFinished
	} = notification
	const intl = useIntl()

	const formatDate = () => when && `${datefns.format(when, dateFormat)}`

	const notificationData = ((): { title: string; description: string } => {
		if (type === 'appointment_new' && when) {
			const message: Record<'title' | 'desc', keyof ILocale> = {
				title: 'notification.newAppointment.title',
				desc: 'notification.newAppointment.description'
			}

			if (!isConfirmed) {
				message.desc = 'notification.newAppointment.description'
			}

			if (typeof isConfirmed === 'boolean') {
				if (!isConfirmed) {
					message.desc = 'notification.rejectedAppointment.description.specialist'
				} else {
					message.desc = 'notification.confirmedAppointment.description.specialist'
				}
			}

			return {
				title: intl.formatMessage({
					id: message.title
				}),
				description: intl.formatMessage({ id: message.desc }, { name, date: formatDate() })
			}
		}

		if (type === 'appointment_confirmation' && when) {
			return {
				title: intl.formatMessage({ id: 'notification.confirmedAppointment.title' }),
				description: intl.formatMessage(
					{ id: 'notification.confirmedAppointment.description' },
					{ date: formatDate() }
				)
			}
		}

		if (type === 'appointment_call' && isFinished) {
			return {
				title: intl.formatMessage({ id: 'notification.callAppointment.title' }),
				description: intl.formatMessage({
					id: 'notification.callAppointment.description.ended'
				})
			}
		}

		return {
			title: intl.formatMessage({ id: 'notification.callAppointment.title' }),
			description: intl.formatMessage({ id: 'notification.callAppointment.description' })
		}
	})()

	const { avatar: messageAvatar } = renderAvatar({ name, avatar, type })

	return (
		<ListItem
			disableGutters
			secondaryAction={
				type === 'appointment_new' && typeof isConfirmed === 'undefined' ? (
					<ActionContainer>
						<IconButton
							onClick={() => handleConfirm(id, appointmentId)}
							color="success"
							sx={{ p: 0.5 }}
						>
							<CheckIcon />
						</IconButton>
						<IconButton
							onClick={() => handleReject(id, appointmentId)}
							color="error"
							sx={{ p: 0.5 }}
						>
							<CloseIcon />
						</IconButton>
					</ActionContainer>
				) : (
					type === 'appointment_call' &&
					!isFinished && (
						<ActionContainer>
							<IconButton onClick={() => handleEnter(id, appointmentId)}>
								<MobileIcon />
							</IconButton>
						</ActionContainer>
					)
				)
			}
		>
			<ListItemAvatar>
				<Avatar sx={{ bgcolor: 'background.neutral' }}>{messageAvatar}</Avatar>
			</ListItemAvatar>
			<ListItemText
				sx={{ maxWidth: '200px' }}
				primary={<Typography variant="subtitle2">{notificationData?.title}</Typography>}
				secondary={
					<>
						<Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
							{capitalizeLetter(notificationData?.description)}
						</Typography>
						<Typography
							variant="caption"
							sx={{
								mt: 0.5,
								display: 'flex',
								color: 'text.disabled'
							}}
						>
							<ClockIcon />
							{datefns.formatDistanceToNow(new Date(createdAt), {
								includeSeconds: true,
								addSuffix: true,
								locale: intl.locale === 'pt-BR' ? ptBR : enUS
							})}
						</Typography>
					</>
				}
			/>
		</ListItem>
	)
}

export default NotificationItem
