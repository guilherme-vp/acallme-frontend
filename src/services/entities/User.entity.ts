import { GenderEnum } from './Gender.enum'
// eslint-disable-next-line import/no-cycle
import { Schedule } from './Schedule.entity'

export interface User {
	id: number
	email: string
	name: string
	password: string
	avatarUrl?: string
	birth: string
	gender: GenderEnum
	cpf: string
	phone: string
	schedule?: Schedule[]
}
