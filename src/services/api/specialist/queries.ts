import { Specialist } from 'services/entities'

import { nodeApi } from '../client'

interface LoginDto {
	username: string
	password: string
}

export interface LoginResponse {
	user: Specialist
	token: string
}

// @ts-ignore
export type SpecialistReponse<T = 'specialist'> = Record<T, Specialist>

export async function fetchMe(): Promise<Specialist> {
	const { data } = await nodeApi.get<SpecialistReponse<'me'>>('specialists/me')

	return data.me
}

export async function fetchSpecialistById(id: number): Promise<Specialist> {
	const { data } = await nodeApi.get<SpecialistReponse>(`specialists/:${id}`)

	return data.specialist
}

export async function fetchSpecialists(): Promise<Specialist[]> {
	const { data } = await nodeApi.get<{ specialists: Specialist[] }>('specialists')

	return data.specialists
}

export async function createSpecialist(): Promise<Specialist> {
	const { data } = await nodeApi.post<SpecialistReponse>('specialists')

	return data.specialist
}

export async function loginSpecialist(input: LoginDto) {
	const { data } = await nodeApi.post<LoginResponse>(
		'specialists/login',
		JSON.stringify(input)
	)

	return data as LoginResponse
}
