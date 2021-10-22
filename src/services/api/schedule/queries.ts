import qs from 'querystring'

import { Schedule } from 'services/entities'

import { nodeApi } from '../client'

export interface FindManyDto {
	rangeStart?: string
	rangeEnd?: string
	callId?: number
	specialistId?: number
	patientId?: number
	confirmed?: boolean
	disabled?: boolean
}

export interface CreateDto {
	dateStart: string
	dateEnd: string
	specialistId: number
}

// @ts-ignore
export type ScheduleReponse<T = 'schedule'> = Record<T, Schedule>

export async function fetchScheduleById(id: number): Promise<Schedule> {
	const { data } = await nodeApi.get<ScheduleReponse>(`schedules/:${id}`)

	return data.schedule
}

export async function fetchSchedules(queries: FindManyDto): Promise<Schedule[]> {
	const { data } = await nodeApi.get<{ schedules: Schedule[] }>('schedules', {
		params: queries,
		paramsSerializer: params => qs.stringify(params)
	})

	return data.schedules
}

export async function createSchedule(input: CreateDto): Promise<Schedule> {
	const { data } = await nodeApi.post<ScheduleReponse>('schedules', input)

	return data.schedule
}

export async function disableSchedule(
	input: Pick<CreateDto, 'dateStart' | 'dateEnd'>
): Promise<boolean> {
	const { data } = await nodeApi.put<{ ok: boolean }>('schedules', input)

	return data.ok
}

export async function confirmSchedule(
	scheduleId: number,
	input: { confirmed: boolean }
): Promise<boolean> {
	const { data } = await nodeApi.patch<{ ok: boolean }>(`schedules/${scheduleId}`, input)

	return data.ok
}
