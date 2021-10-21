import { Patient } from 'services/entities'

import { nodeApi } from '../client'

interface LoginDto {
	username: string
	password: string
}

export interface LoginResponse {
	user: Patient
	token: string
}

// @ts-ignore
export type PatientReponse<T = 'patient'> = Record<T, Patient>

export async function fetchMe(token?: string | null): Promise<Patient> {
	const { data } = await nodeApi.get<PatientReponse<'me'>>(
		'patients/me',
		token ? { headers: { authorization: `Bearer ${token}` } } : {}
	)

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

export async function createPatient(): Promise<Patient> {
	const { data } = await nodeApi.post<PatientReponse>('patients')

	return data.patient
}

export async function loginPatient(input: LoginDto): Promise<LoginResponse> {
	const { data } = await nodeApi.post('patients/login', input)

	return data as LoginResponse
}
