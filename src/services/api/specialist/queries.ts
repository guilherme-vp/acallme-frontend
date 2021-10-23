import qs from 'querystring'

import { Specialist, GenderEnum } from 'services/entities'

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

export interface SignupDto {
	email: string
	name: string
	password: string
	avatarUrl?: string
	cnpj: string
	cpf: string
	crp?: string
	crm?: string
	gender: GenderEnum
	birth: string
	phone: number
	about: string
	cost: number
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

export async function fetchSpecialists(queries: GetManyDto): Promise<Specialist[]> {
	const { data } = await nodeApi.get<{ specialists: Specialist[] }>('specialists', {
		params: queries,
		paramsSerializer: params => qs.stringify(params)
	})

	return data.specialists
}

export async function signupSpecialist(input: SignupDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('specialists/signup', input)

	return data as LoginResponse
}

export async function loginSpecialist(input: LoginDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('specialists/login', input)

	return data as LoginResponse
}
