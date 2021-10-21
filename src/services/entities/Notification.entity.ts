export interface Notification {
	id: string
	scheduleId: number
	avatar?: string
	name?: string
	type: 'appointment_confirmation' | 'appointment_new' | 'appointment_call'
	when?: Date
	isUnRead?: boolean
	isConfirmed?: boolean
	isFinished?: boolean
	createdAt: Date
}
