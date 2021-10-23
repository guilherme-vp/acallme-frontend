/* eslint-disable import/no-cycle */
import { Call } from './Call.entity'
import { Patient } from './Patient.entity'
import { Specialist } from './Specialist.entity'

export interface Schedule {
	id: number
	specialistId: number
	callId?: number
	patientId?: number
	rangeStart: string
	rangeEnd: string
	confirmed?: boolean
	disabled?: boolean
	call?: Call
	specialist?: Specialist
	patient?: Patient
}
