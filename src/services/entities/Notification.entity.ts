import { NotificationsEnum } from './Notifications.enum'

export interface Notification {
	id: string
	scheduleId: number
	avatar?: string
	name?: string
	type: NotificationsEnum
	when?: Date
	isUnRead?: boolean
	isConfirmed?: boolean
	isFinished?: boolean
	createdAt: Date
}
