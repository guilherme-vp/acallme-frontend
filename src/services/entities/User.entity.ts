import { GenderEnum } from './Gender.enum'

export interface User {
	id?: number
	scheduleId?: number
	email: string
	name: string
	password?: string
	birth: Date | null
	gender: GenderEnum
	cpf: string
	phone?: string
}
