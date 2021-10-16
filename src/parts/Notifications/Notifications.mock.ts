import { sub } from 'date-fns'
import faker from 'faker'

import { Notification } from 'services/entities'

export const NOTIFICATIONS: Notification[] = [
	...Array(faker.datatype.number({ min: 1, max: 7 }))
		.fill(null)
		.map<Notification>(() => ({
			id: faker.datatype.uuid(),
			appointmentId: faker.datatype.number(),
			name: faker.name.firstName(),
			avatar: faker.image.people(40, 40),
			// @ts-ignore
			type: ['appointment_call', 'appointment_confirmation', 'appointment_new'][
				faker.datatype.number(3)
			],
			when: faker.date.future(0),
			createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
			isUnRead: true
		})),
	{
		id: faker.datatype.uuid(),
		appointmentId: faker.datatype.number(),
		name: faker.name.firstName(),
		avatar: faker.image.people(36, 36),
		type: 'appointment_confirmation',
		when: faker.date.future(0),
		createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
		isUnRead: false
	},
	{
		id: faker.datatype.uuid(),
		appointmentId: faker.datatype.number(),
		name: faker.name.firstName(),
		avatar: faker.image.business(),
		type: 'appointment_call',
		createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
		isUnRead: false
	},
	{
		id: faker.datatype.uuid(),
		appointmentId: faker.datatype.number(),
		name: faker.name.firstName(),
		avatar: faker.image.business(),
		type: 'appointment_call',
		createdAt: sub(new Date(), { hours: faker.datatype.number(24) }),
		isUnRead: false,
		isFinished: true
	}
]
