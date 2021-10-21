import { Specialist } from 'services/entities'

import { nodeApi } from '../client'

export interface LoginDto {
	username: string
	password: string
}

export interface LoginResponse {
	user: Specialist
	token: string
}

export async function fetchSpecialistById(id: number): Promise<Specialist> {
	const { data } = await nodeApi.get(`specialists/:${id}`)

	return data as Specialist
}

export async function fetchSpecialists(): Promise<Specialist[]> {
	const { data } = await nodeApi.get('specialists')

	return data as Specialist[]
}

export async function createSpecialist(): Promise<Specialist> {
	const { data } = await nodeApi.get('specialists')

	return data as Specialist
}

export async function loginSpecialist(input: LoginDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('specialists/login', JSON.stringify(input))

	return data as LoginResponse
}
