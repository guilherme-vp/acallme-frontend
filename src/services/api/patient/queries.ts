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

export async function fetchPatientById(id: number): Promise<Patient> {
	const { data } = await nodeApi.get(`patients/:${id}`)

	return data as Patient
}

export async function fetchPatients(): Promise<Patient[]> {
	const { data } = await nodeApi.get('patients')

	return data as Patient[]
}

export async function createPatient(): Promise<Patient> {
	const { data } = await nodeApi.post('patients')

	return data as Patient
}

export async function loginPatient(input: LoginDto) {
	const { data } = await nodeApi.post('specialists/login', JSON.stringify(input))

	return data as LoginResponse
}
