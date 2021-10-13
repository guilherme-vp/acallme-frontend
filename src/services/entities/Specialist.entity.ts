import { Specialty } from './Specialty.entity'
import { User } from './User.entity'

export type Specialist = User & {
	about?: string
	cpf?: string
	cnpj?: string
	crp?: string
	crm?: string
	location: string
	specialties: Specialty[]
}
