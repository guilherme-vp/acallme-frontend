/* eslint-disable import/no-duplicates */
import { useState, useEffect, useCallback } from 'react'

import {
	format,
	startOfWeek,
	daysInWeek,
	addDays,
	set,
	endOfWeek,
	differenceInHours
} from 'date-fns'
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
	const intlLocale = intl.locale === 'pt-BR' ? ptBR : enUS

	const firstDay = startOfWeek(date, { weekStartsOn: 1 })
	const lastDay = endOfWeek(date, { weekStartsOn: 1 })
	const startWeekMonth = format(firstDay, 'MMM')
	const year = format(date, 'yyyy')
	const firstDayOfWeek = startOfWeek(date, { weekStartsOn: 1 })

	const getWeekDays = useCallback(() => {
		function formatDay(oldDate: Date) {
			return format(oldDate, 'd', { locale: intlLocale })
		}

		// 21h - 6h = 15h
		const allFormattedHours: HoursRange[][] = Array.from(
			{ length: dayEnds - dayStart },
			(_, index) => {
				const hour = index + dayStart // Day start at 6am

				const mockedWeekDays: HoursRange[] = Array.from(
					{ length: daysInWeek },
					(__, day): HoursRange => {
						const aimedDay = set(addDays(firstDayOfWeek, day), {
							hours: hour,
							minutes: 0
						})

						const formattedHour = format(aimedDay, 'HH:mm')

						if (differenceInHours(aimedDay, new Date()) <= 0) {
							return {
								day: aimedDay,
								hour: formattedHour,
								isDisabled: true,
								isScheduled: false
							}
						}

						const scheduleExists = data?.find(
							({ startsAt }) => new Date(startsAt).getTime() === aimedDay.getTime()
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
					}
				).sort((a, b) => (a.day > b.day ? 1 : -1))

				return mockedWeekDays
			}
		) as HoursRange[][]

		const allFormattedWeeks: WeekHeader[] = Array(daysInWeek)
			.fill(null)
			.map((_, index) => {
				const aimedDay = addDays(firstDayOfWeek, index)

				return {
					title: format(aimedDay, 'E', { locale: intlLocale }),
					desc: format(aimedDay, 'LLL d', { locale: intlLocale })
				}
			})

		const allWeek = { hours: allFormattedHours, weeks: allFormattedWeeks }

		let selector: string

		if (+formatDay(firstDay) > +formatDay(lastDay)) {
			const nextMonth = format(lastDay, 'MMM', { locale: intlLocale })

			const formattedfirstDay = formatDay(firstDay)
			const formattedLastDay = formatDay(lastDay)

			selector = `${startWeekMonth} ${formattedfirstDay} - ${nextMonth
				.charAt(0)
				.toUpperCase()}${nextMonth.slice(1)} ${formattedLastDay}, ${year}`
		} else {
			selector = `${startWeekMonth} ${formatDay(firstDay)}-${formatDay(lastDay)}, ${year}`
		}

		return { selector, schedule: allWeek }
	}, [data, intlLocale, firstDay, firstDayOfWeek, lastDay, startWeekMonth, year])

	const [week, setWeek] = useState<ScheduleContent>(getWeekDays())

	useEffect(() => {
		setWeek(getWeekDays())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, date, intlLocale])

	return week
}

export default useSchedule
