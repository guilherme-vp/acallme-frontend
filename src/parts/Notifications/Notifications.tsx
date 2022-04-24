/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useRef, useState, useEffect } from 'react'

import {
	List,
	Badge,
	Divider,
	IconButton,
	Typography,
	ListSubheader,
	Grid
} from '@mui/material'
import {
	MdNotifications as FilledBell,
	MdNotificationsNone as OutlinedBell
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { MenuPopover } from 'components/MenuPopover'
import { NotificationItem } from 'components/NotificationItem'
import { Scrollbar } from 'components/Scrollbar'
import { WsEvents } from 'constants/ws-events'
import { useIntl } from 'hooks'
import { VIDEOCALL } from 'routes'
import { Notification } from 'services/entities'
import { callSocket as socket } from 'services/ws/client'
import { capitalizeLetter } from 'utils/capitalize-letter'

export const NotificationsPopover = () => {
	const navigate = useNavigate()
	const intl = useIntl()
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [notifications, setNotifications] = useState<Notification[]>([])
	const sortedNotifications = notifications.sort((a, b) => {
		if (a.type === 'appointment_call' && !a.isFinished) {
			return -1
		}

		if (a.createdAt > b.createdAt) {
			return -1
		}
		return 1
	})
	const unReadNotifications = sortedNotifications.filter(
		({ isUnRead }) => isUnRead === true
	)
	const readNotifications = sortedNotifications.filter(({ isUnRead }) => isUnRead === false)
	const totalUnRead = unReadNotifications.length
	const totalRead = readNotifications.length

	useEffect(() => {
		socket.on(WsEvents.SEND_NOTIFICATION, (notification: Notification) => {
			setNotifications(prevNotifications => [...prevNotifications, notification])
		})
	}, [])

	const handleMarkAllAsRead = () => {
		setNotifications(
			notifications.map(notification => ({
				...notification,
				isUnRead: false
			}))
		)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		handleMarkAllAsRead()
	}

	const handleConfirm = (notificationId: string, scheduleId: number) => {
		const notificationIndex = notifications.findIndex(({ id }) => id === notificationId)
		const newNotifications = [...notifications]

		newNotifications[notificationIndex] = {
			...newNotifications[notificationIndex],
			isConfirmed: true
		}

		setNotifications([...newNotifications])
		// TODO: update in backend
	}

	const handleReject = (notificationId: string, scheduleId: number) => {
		const notificationIndex = notifications.findIndex(({ id }) => id === notificationId)

		setNotifications(prev => {
			const newNotifications = [...prev]

			newNotifications[notificationIndex] = {
				...newNotifications[notificationIndex],
				isConfirmed: false
			}

			return newNotifications
		})
		// TODO: update in backend
	}

	const handleEnter = (notificationId: string, scheduleId: number) => {
		setNotifications(prev => prev.filter(({ id }) => id !== notificationId))

		navigate(`/${VIDEOCALL}/${scheduleId}`)
	}

	return (
		<>
			<IconButton ref={anchorRef} size="large" color="primary" onClick={handleOpen}>
				<Badge color="error" badgeContent={totalUnRead} max={5}>
					{totalUnRead > 0 ? <FilledBell /> : <OutlinedBell />}
				</Badge>
			</IconButton>

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 360 }}
			>
				<Grid container alignItems="center" px={2} py={2}>
					<Grid item xs={12} flexGrow={1}>
						<Typography variant="subtitle1">
							{capitalizeLetter(intl.formatMessage({ id: 'notification' }, { length: 2 }))}
						</Typography>
						<Typography variant="body2" sx={{ color: 'text.secondary' }}>
							{totalUnRead === 0
								? intl.formatMessage({ id: 'notifications.noNew' })
								: intl.formatMessage(
										{ id: 'notifications.totalUnRead' },
										{ length: totalUnRead }
								  )}
						</Typography>
					</Grid>
				</Grid>

				<Divider />

				<Scrollbar sx={{ maxHeight: { xs: 400 } }}>
					{totalUnRead > 0 && (
						<List
							disablePadding
							subheader={
								<ListSubheader
									disableSticky
									sx={{ pt: 1, px: 2.5, typography: 'overline' }}
								>
									{intl.formatMessage({ id: 'notifications.new.title' })}
								</ListSubheader>
							}
						>
							{unReadNotifications.map(notification => (
								<NotificationItem
									key={notification.id}
									notification={notification}
									handleConfirm={handleConfirm}
									handleEnter={handleEnter}
									handleReject={handleReject}
								/>
							))}
						</List>
					)}

					{totalRead > 0 && (
						<List
							disablePadding
							subheader={
								<ListSubheader
									disableSticky
									sx={{ pt: 1, px: 2.5, typography: 'overline' }}
								>
									{intl.formatMessage({ id: 'notifications.old.title' })}
								</ListSubheader>
							}
						>
							{readNotifications.map(notification => (
								<NotificationItem
									key={notification.id}
									notification={notification}
									handleConfirm={handleConfirm}
									handleEnter={handleEnter}
									handleReject={handleReject}
								/>
							))}
						</List>
					)}
				</Scrollbar>
			</MenuPopover>
		</>
	)
}

export default NotificationsPopover
