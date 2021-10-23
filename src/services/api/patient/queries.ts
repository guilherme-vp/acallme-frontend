import { GenderEnum, Patient } from 'services/entities'

import { nodeApi } from '../client'

interface LoginDto {
	username: string
	password: string
}

export interface LoginResponse {
	user: Patient
	token: string
}

export interface SignupDto {
	email: string
	name: string
	password: string
	cpf: string
	gender: GenderEnum
	birth: string
	phone: number
}

// @ts-ignore
export type PatientReponse<T = 'patient'> = Record<T, Patient>

export async function fetchMe(): Promise<Patient> {
	const { data } = await nodeApi.get<PatientReponse<'me'>>('patients/me')

	return data.me
}

export async function fetchPatientById(id: number): Promise<Patient> {
	const { data } = await nodeApi.get<PatientReponse>(`patients/:${id}`)

	return data.patient
}

export async function fetchPatients(): Promise<Patient[]> {
	const { data } = await nodeApi.get<{ patients: Patient[] }>('patients')

	return data.patients
}

export async function signupPatient(input: SignupDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('patients/signup', input)

	return data as LoginResponse
}

export async function loginPatient(input: LoginDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('patients/login', input)

	return data as LoginResponse
}
