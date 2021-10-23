import { formatDistanceToNow, set } from 'date-fns'

export function fToNow(date: Date): string {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true
	})
}

export function cleanTime(date: Date) {
	return set(date, {
		minutes: 0,
		seconds: 0,
		milliseconds: 0
	})
}
