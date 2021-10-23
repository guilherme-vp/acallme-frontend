import { differenceInHours, format, set } from 'date-fns'

import { HoursRange } from 'hooks/useSchedule'
import { Schedule } from 'services/entities'

export function formatHours(schedules: Schedule[], day = new Date()): HoursRange[] {
	const allFormattedHours = Array(21 - 6) // 21h - 6h = 15h
		.fill(null)
		.map((_, index): HoursRange => {
			const hour = index + 6 // Day start at 6am

			const aimedDay = set(day, {
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

			const scheduleExists = schedules.find(
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

	return allFormattedHours
}
