import React from 'react'

import { ChatIcon } from 'assets/icons/Chat'
import { MailIcon } from 'assets/icons/Mail'
import { Notification, NotificationsEnum } from 'services/entities'
import { getInitials } from 'utils/get-initials'

export function renderAvatar({
	name,
	type,
	avatar
}: Pick<Notification, 'name' | 'type' | 'avatar'>) {
	switch (type) {
		case NotificationsEnum.APPOINTMENT_NEW:
			return {
				avatar: <MailIcon />
			}
		case NotificationsEnum.APPOINTMENT_CALL:
			return {
				avatar: <ChatIcon />
			}
		case NotificationsEnum.APPOINTMENT_CONFIRMATION:
			return {
				avatar: <img alt={`${name}-notif`} src={avatar ?? ''} />
			}
		default:
			return {
				avatar: name ? getInitials(name) : 'AC'
			}
	}
}
