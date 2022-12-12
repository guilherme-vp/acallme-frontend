import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WsEvents } from 'constants/ws-events'
import { VIDEOCALL } from 'routes'
import { Notification } from 'services/entities'
import { notificationSocket as socket } from 'services/ws/client'
import { confirmSchedule } from 'services/api/schedule'

export interface NotificationContextProps {
	totalUnRead: number
	totalRead: number
	unReadNotifications: Notification[]
	readNotifications: Notification[]

	handleMarkAllAsRead: () => void
	handleEnter: (notificationId: string, scheduleId: number) => void
	handleConfirm: (notificationId: string, scheduleId: number, isConfirmed: boolean) => void
}

export const NotificationContext = createContext<NotificationContextProps>({
	totalUnRead: 0,
	totalRead: 0,
	unReadNotifications: [],
	readNotifications: [],

	handleMarkAllAsRead: () => {},
	handleEnter: () => {},
	handleConfirm: () => {}
})

export const NotificationProvider: React.FC = ({ children }) => {
	const navigate = useNavigate()

	const [notifications, setNotifications] = useState<Notification[]>([])

	const unReadNotifications = notifications.filter(({ isUnRead }) => isUnRead === true)
	const readNotifications = notifications.filter(({ isUnRead }) => isUnRead === false)
	const totalUnRead = unReadNotifications.length
	const totalRead = readNotifications.length

	useEffect(() => {
		socket.emit(WsEvents.IDENTIFY)

		socket.on(WsEvents.SEND_NOTIFICATION, (notification: Notification) => {
			console.log('New notification', notification)
			setNotifications(prevNotifications => [
				...prevNotifications,
				{ ...notification, isUnRead: true }
			])
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

	const handleConfirm = (
		notificationId: string,
		scheduleId: number,
		isConfirmed: boolean
	) => {
		const notificationIndex = notifications.findIndex(({ id }) => id === notificationId)
		const newNotifications = [...notifications]

		newNotifications[notificationIndex] = {
			...newNotifications[notificationIndex],
			isConfirmed: isConfirmed
		}

		setNotifications(newNotifications)
		confirmSchedule({ confirmed: isConfirmed, scheduleId })
	}

	const handleEnter = (notificationId: string, scheduleId: number) => {
		setNotifications(prev => prev.filter(({ id }) => id !== notificationId))

		navigate(`/${VIDEOCALL}/${scheduleId}`)
	}

	return (
		<NotificationContext.Provider
			value={{
				unReadNotifications,
				readNotifications,
				totalRead,
				totalUnRead,

				handleMarkAllAsRead,
				handleEnter,
				handleConfirm
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}
