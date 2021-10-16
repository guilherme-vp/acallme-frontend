/* eslint-disable import/no-duplicates */
import { format, startOfWeek, daysInWeek, addDays, endOfWeek } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import faker from 'faker'

export interface RangeCell {
	scheduleId: number
	hour: number
	isScheduled: boolean
	isDisabled: boolean
}

export interface Agenda {
	title: string
	desc: string
	ranges: RangeCell[]
}

export interface WeekState {
	selector: string
	schedule: Agenda[]
}

interface Args {
	date: Date
	patientId: number
	specialistId: number
}

function weekDays({ date, patientId, specialistId }: Args): Agenda[] {
	const firstDayOfWeek = startOfWeek(date)

	const allFormattedDays: Agenda[] = Array(daysInWeek)
		.fill(null)
		.map((_, index) => {
			const aimedDay = addDays(firstDayOfWeek, index)

			const desc = format(aimedDay, 'E, LLL do')

			// TODO: Do the fetch with specialistId returning all schedules in the period and then check if schedule has patientId
			const mockedRange: RangeCell[] = Array(18)
				.fill(null)
				.map((__, hour) => {
					// TODO: if no schedule is found in the current hour, return isDisabled as true
					const isScheduled = faker.datatype.boolean()

					return {
						hour: hour + 1,
						isScheduled,
						isDisabled: !isScheduled,
						scheduleId: faker.datatype.number(100)
					}
				})

			return {
				title: format(aimedDay, 'E'),
				desc,
				ranges: mockedRange
			}
		})

	return allFormattedDays
}

export function getWeek({
	date,
	locale,
	patientId,
	specialistId
}: Args & { locale: string }): WeekState {
	const intlLocale = locale === 'pt-BR' ? ptBR : enUS

	function formatDay(oldDate: Date) {
		return format(oldDate, 'd', { locale: intlLocale })
	}

	const now = new Date()

	const firstDay = startOfWeek(now, { weekStartsOn: 1 })
	const lastDay = endOfWeek(now)
	const startWeekMonth = format(firstDay, 'MMM')
	const year = format(now, 'yyyy')

	const allWeek = weekDays({ date, patientId, specialistId })

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
