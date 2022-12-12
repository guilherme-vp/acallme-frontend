import qs from 'querystring'

import { Specialist } from 'services/entities'

import { nodeApi } from '../client'

interface LoginDto {
	username: string
	password: string
}

interface GetManyDto {
	specialties?: string[]
	name?: string
	page?: number
	limit?: number
}

export interface LoginResponse {
	user: Specialist
	token: string
}

export type SignupDto = Omit<
	Specialist,
	'avatarUrl' | 'schedule' | 'specialties' | 'id'
> & {
	specialties: string[]
}

// @ts-ignore
export type SpecialistResponse<T = 'specialist'> = Record<T, Specialist>

export async function fetchMe(): Promise<Specialist> {
	const { data } = await nodeApi.get<SpecialistResponse<'me'>>('specialists/me')

	return data.me
}

export async function fetchSpecialistById(id: number): Promise<Specialist> {
	const { data } = await nodeApi.get<SpecialistResponse>(`specialists/:${id}`)

	return data.specialist
}

export async function fetchSpecialists(
	queries: GetManyDto
): Promise<{ specialists: Specialist[]; count: number }> {
	const { data } = await nodeApi.get<{ specialists: Specialist[]; count: number }>(
		'specialists',
		{
			params: queries,
			paramsSerializer: params => qs.stringify(params)
		}
	)

	return data
}

export async function signupSpecialist(input: SignupDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('specialists/signup', input)

	return data as LoginResponse
}

export async function loginSpecialist(input: LoginDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('specialists/login', input)

	return data as LoginResponse
}
