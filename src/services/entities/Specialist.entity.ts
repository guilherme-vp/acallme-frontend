/* eslint-disable import/no-cycle */
import { Specialty } from './Specialty.entity'
import { User } from './User.entity'

export interface Specialist extends User {
	cnpj?: string
	about?: string
	cost: number
	crp?: string
	crm?: string
	specialties?: Specialty[]
}
