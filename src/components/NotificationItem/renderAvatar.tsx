import React from 'react'

import { ChatIcon } from 'assets/icons/Chat'
import { MailIcon } from 'assets/icons/Mail'
import { Notification } from 'services/entities'
import { getInitials } from 'utils/get-initials'

export function renderAvatar({
	name,
	type,
	avatar
}: Pick<Notification, 'name' | 'type' | 'avatar'>) {
	if (type === 'appointment_new') {
		return {
			avatar: <MailIcon />
		}
	}
	if (type === 'appointment_call') {
		return {
			avatar: <ChatIcon />
		}
	}
	if (type === 'appointment_confirmation') {
		return {
			avatar: <img alt={`${name}-notif`} src={avatar ?? ''} />
		}
	}

	return {
		avatar: name ? getInitials(name) : 'AC'
	}
}
