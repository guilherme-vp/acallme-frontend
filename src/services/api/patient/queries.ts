import { Patient } from 'services/entities'

import { nodeApi } from '../client'

export async function fetchPatientById(id: number): Promise<Patient> {
	const { data } = await nodeApi.get(`patients/:${id}`)

	return data as Patient
}

export async function fetchPatients(): Promise<Patient[]> {
	const { data } = await nodeApi.get(`patients`)

	return data as Patient[]
}

export async function createPatient(): Promise<Patient> {
	const { data } = await nodeApi.get(`patients`)

	return data as Patient
}
