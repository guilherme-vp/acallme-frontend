/* eslint-disable import/no-cycle */
import { Specialty } from './Specialty.entity'
import { User } from './User.entity'

export type Specialist = User & {
	cpf: string
	cnpj: string
	crp?: string
	crm?: string
	cost: number
	about: string
	specialties?: Specialty[]
}
