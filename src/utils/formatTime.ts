import { formatDistanceToNow } from 'date-fns'

export function fToNow(date: Date): string {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true
	})
}
