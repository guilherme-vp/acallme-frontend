/* eslint-disable import/no-duplicates */
import { format, startOfWeek, daysInWeek, addDays, endOfWeek, set } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import faker from 'faker'

export interface HoursRange {
	day: number
	hour: string
	isScheduled: boolean
	isDisabled: boolean
	scheduleId: number
}

export interface WeekContent {
	weeks: WeekHeader[]
	hours: HoursRange[][]
}

export interface WeekHeader {
	title: string
	desc: string
}

export interface ScheduleContent {
	selector: string
	schedule: WeekContent
}

interface Args {
	date: Date
	patientId: number
	specialistId: number
}

// Saída
// Array multidimensional de 18 posições contendo 7 dias.
// Ex: [[{ hour: 6, day: 1 }, { hour: 6, day: 2 }], [{ hour: 7, day: 1 }, { hour: 7, day: 2 }], ..., [{hour: 23, day: 6}, { hour: 23, day: 7 }]]

function getWeekAndHours({ date, patientId, specialistId }: Args): WeekContent {
	const firstDayOfWeek = startOfWeek(date, { weekStartsOn: 1 })

	const allFormattedHours: HoursRange[][] = Array(15) // 21h - 6h = 15h
		.fill(null)
		.map((_, index) => {
			const hour = index + 6 // Day start at 6am

			// TODO: Do the fetch with specialistId returning all schedules in the period and then check if schedule has patientId
			const mockedWeekDays: HoursRange[] = Array(daysInWeek)
				.fill(null)
				.map((__, day) => {
					// TODO: if no schedule is found in the current hour, return isDisabled as true
					const isScheduled = faker.datatype.boolean()

					const formattedHour = format(
						set(new Date(), { hours: hour, minutes: 0 }),
						'HH:mm'
					)

					return {
						day,
						hour: formattedHour,
						isScheduled,
						isDisabled: faker.datatype.boolean(),
						scheduleId: faker.datatype.number()
					}
				})
				.sort((a, b) => (a.day > b.day ? 1 : -1))

			return mockedWeekDays
		})

	const allFormattedWeeks: WeekHeader[] = Array(daysInWeek)
		.fill(null)
		.map((_, index) => {
			const aimedDay = addDays(firstDayOfWeek, index)

			const desc = format(aimedDay, 'LLL do')

			return {
				title: format(aimedDay, 'E'),
				desc
			}
		})

	return { hours: allFormattedHours, weeks: allFormattedWeeks }
}

export function getWeek({
	date,
	locale,
	patientId,
	specialistId
}: Args & { locale?: string }): ScheduleContent {
	const intlLocale = locale === 'pt-BR' ? ptBR : enUS

	function formatDay(oldDate: Date) {
		return format(oldDate, 'd', { locale: intlLocale })
	}

	const now = new Date()

	const firstDay = startOfWeek(now, { weekStartsOn: 1 })
	const lastDay = endOfWeek(now, { weekStartsOn: 1 })
	const startWeekMonth = format(firstDay, 'MMM')
	const year = format(now, 'yyyy')

	const allWeek = getWeekAndHours({ date, patientId, specialistId })

	let selector: string

	if (+formatDay(firstDay) > +formatDay(lastDay)) {
		const nextMonth = format(lastDay, 'MMM', { locale: intlLocale })

		const formattedfirstDay = formatDay(firstDay)
		const formattedLastDay = formatDay(lastDay)

		selector = `${startWeekMonth} ${formattedfirstDay} - ${nextMonth} ${formattedLastDay}, ${year}`
	} else {
		selector = `${startWeekMonth} ${formatDay(firstDay)}-${formatDay(lastDay)}, ${year}`
	}

	return { selector, schedule: allWeek }
}
