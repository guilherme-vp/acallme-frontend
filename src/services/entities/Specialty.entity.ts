import { Specialist } from './Specialist.entity'

export interface Specialty {
	id: string
	name: string
	specialists: Specialist[]
}
