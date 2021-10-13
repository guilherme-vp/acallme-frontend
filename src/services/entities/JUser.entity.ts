import { RolesEnum } from './Roles.enum'

export interface JUser {
	id: string
	email: string
	role: RolesEnum
	iat: number
	exp: number
}
