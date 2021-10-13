export function capitalizeLetter(word: string) {
	const firstLetter = word[0].toUpperCase()

	return `${firstLetter}${word.substring(1)}`
}
