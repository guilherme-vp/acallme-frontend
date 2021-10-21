// eslint-disable-next-line import/no-cycle
import { Specialist } from './Specialist.entity'

export interface Specialty {
	id: number
	name: string
	specialists?: Specialist[]
}
