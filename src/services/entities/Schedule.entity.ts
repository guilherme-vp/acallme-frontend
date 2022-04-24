/* eslint-disable import/no-cycle */
import { Call } from './Call.entity'
import { Patient } from './Patient.entity'
import { Specialist } from './Specialist.entity'

export interface Schedule {
	id: number
	callId?: number
	specialistId: number
	patientId?: number
	startsAt: Date
	endsAt: Date
	confirmed?: boolean
	disabled?: boolean
	call?: Call
	specialist?: Specialist
	patient?: Patient
}
