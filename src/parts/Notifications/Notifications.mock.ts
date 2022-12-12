import { sub } from 'date-fns'
import faker from 'faker'

import { Notification, NotificationsEnum } from 'services/entities'

export const NOTIFICATIONS: Notification[] = [
	...Array(faker.datatype.number({ min: 1, max: 7 }))
		.fill(null)
		.map<Notification>(() => ({
			id: faker.datatype.uuid(),
			scheduleId: faker.datatype.number(),
			name: faker.name.firstName(),
			avatar: faker.image.people(40, 40),
			type: Object.values(NotificationsEnum)[faker.datatype.number(3)],
			when: faker.date.future(0),
			createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
			isUnRead: true
		})),
	{
		id: faker.datatype.uuid(),
		scheduleId: faker.datatype.number(),
		name: faker.name.firstName(),
		avatar: faker.image.people(36, 36),
		type: NotificationsEnum.APPOINTMENT_CONFIRMATION,
		when: faker.date.future(0),
		createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
		isUnRead: false
	},
	{
		id: faker.datatype.uuid(),
		scheduleId: faker.datatype.number(),
		name: faker.name.firstName(),
		avatar: faker.image.business(),
		type: NotificationsEnum.APPOINTMENT_CALL,
		createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
		isUnRead: false
	},
	{
		id: faker.datatype.uuid(),
		scheduleId: faker.datatype.number(),
		name: faker.name.firstName(),
		avatar: faker.image.business(),
		type: NotificationsEnum.APPOINTMENT_CALL,
		createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
		isUnRead: false,
		isFinished: true
	}
]
