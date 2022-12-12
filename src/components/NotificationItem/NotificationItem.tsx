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
import { Notification, NotificationsEnum } from 'services/entities'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { ActionContainer, ClockIcon } from './NotificationItem.styled'
import { renderAvatar } from './renderAvatar'

interface NotificationItemProps {
	notification: Notification
	handleConfirm: (id: string, scheduleId: number, isConfirmed: boolean) => void
	handleEnter: (id: string, scheduleId: number) => void
}

export const NotificationItem = ({
	notification,
	handleConfirm,
	handleEnter
}: NotificationItemProps) => {
	const { id, avatar, createdAt, scheduleId, name, when, type, isConfirmed, isFinished } =
		notification
	const intl = useIntl()

	const formatDate = () => when && `${datefns.format(new Date(when), dateFormat)}`

	const notificationData = ((): { title: string; description: string } => {
		if (when) {
			switch (type) {
				case NotificationsEnum.APPOINTMENT_NEW:
					return {
						title: intl.formatMessage({
							id: 'notification.newAppointment.title'
						}),
						description: intl.formatMessage(
							{ id: 'notification.newAppointment.description' },
							{ name, date: formatDate() }
						)
					}
				case NotificationsEnum.APPOINTMENT_CONFIRMATION:
					const messageConfirmation: Record<'title' | 'desc', keyof ILocale> = {
						title: isConfirmed
							? 'notification.confirmedAppointment.title'
							: 'notification.rejectedAppointment.title',
						desc: isConfirmed
							? 'notification.confirmedAppointment.description'
							: 'notification.rejectedAppointment.description'
					}

					return {
						title: intl.formatMessage({ id: messageConfirmation.title }),
						description: intl.formatMessage(
							{ id: messageConfirmation.desc },
							{ name, date: formatDate() }
						)
					}
			}
		}

		if (type === NotificationsEnum.APPOINTMENT_CALL && isFinished) {
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
				type === NotificationsEnum.APPOINTMENT_NEW && isConfirmed == null ? (
					<ActionContainer>
						<IconButton
							onClick={() => handleConfirm(id, scheduleId, true)}
							color="success"
							sx={{ p: 0.5 }}
						>
							<CheckIcon />
						</IconButton>
						<IconButton
							onClick={() => handleConfirm(id, scheduleId, false)}
							color="error"
							sx={{ p: 0.5 }}
						>
							<CloseIcon />
						</IconButton>
					</ActionContainer>
				) : (
					type === NotificationsEnum.APPOINTMENT_CALL &&
					!isFinished && (
						<ActionContainer>
							<IconButton onClick={() => handleEnter(id, scheduleId)}>
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
