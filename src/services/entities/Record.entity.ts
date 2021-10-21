import { Call } from './Call.entity'

export interface Record {
	id: number
	callId: number
	observation?: string
	diagnosis: string
	call?: Call
}
