export function getInitials(fn: string, ln?: string): string {
	if (fn && ln) {
		return `${fn?.charAt(0).toUpperCase()}${ln.charAt(0).toUpperCase()}`
	}

	return fn.charAt(0)
}
