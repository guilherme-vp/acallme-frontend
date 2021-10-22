/* eslint-disable import/no-duplicates */
import { useState, useEffect } from 'react'

import { format, startOfWeek, daysInWeek, addDays, set, endOfWeek } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'

import { Schedule } from 'services/entities'

import { useIntl } from './useIntl'

export interface HoursRange {
	day: Date
	hour: string
	isScheduled: boolean
	isConfirmed?: boolean
	isDisabled?: boolean
	scheduleId?: number
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

export const dayStart = 6
export const dayEnds = 21

export const useSchedule = (
	data: Schedule[] | undefined,
	date: Date = new Date()
): ScheduleContent => {
	const intl = useIntl()

	function formatDay(oldDate: Date) {
		return format(oldDate, 'd', { locale: intlLocale })
	}

	const firstDay = startOfWeek(date, { weekStartsOn: 1 })
	const lastDay = endOfWeek(date, { weekStartsOn: 1 })
	const startWeekMonth = format(firstDay, 'MMM')
	const year = format(date, 'yyyy')
	const firstDayOfWeek = startOfWeek(date, { weekStartsOn: 1 })

	const intlLocale = intl.locale === 'pt-BR' ? ptBR : enUS

	function getWeekDays() {
		const allFormattedHours: HoursRange[][] = Array(dayEnds - dayStart) // 21h - 6h = 15h
			.fill(null)
			.map((_, index) => {
				const hour = index + dayStart // Day start at 6am

				const mockedWeekDays: HoursRange[] = Array(daysInWeek)
					.fill(null)
					.map((__, day): HoursRange => {
						const aimedDay = set(addDays(firstDayOfWeek, day), {
							hours: hour,
							minutes: 0
						})

						const formattedHour = format(aimedDay, 'HH:mm')

						const scheduleExists = data?.find(
							({ rangeStart }) => new Date(rangeStart).getTime() === aimedDay.getTime()
						)

						if (!scheduleExists) {
							return {
								day: aimedDay,
								hour: formattedHour,
								isScheduled: false,
								isDisabled: false
							}
						}

						return {
							day: aimedDay,
							hour: formattedHour,
							isScheduled: !!scheduleExists.patientId,
							isDisabled: scheduleExists.disabled,
							isConfirmed: scheduleExists.confirmed,
							scheduleId: scheduleExists.id
						}
					})
					.sort((a, b) => (a.day > b.day ? 1 : -1))

				return mockedWeekDays
			}) as HoursRange[][]

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

		const allWeek = { hours: allFormattedHours, weeks: allFormattedWeeks }

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
	const [week, setWeek] = useState<ScheduleContent>(getWeekDays())

	useEffect(() => {
		setWeek(getWeekDays())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, date])

	return week
}

export default useSchedule
