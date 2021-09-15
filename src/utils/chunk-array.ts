export const chunkArray = <T extends Array<any>, U = T[number]>(
	myArray: T,
	chunkSize: number
): U[][] => {
	const tempArray: U[][] = []

	for (let i = 0; i < myArray.length; i += chunkSize) {
		const myChunk = myArray.slice(i, i + chunkSize)
		tempArray.push(myChunk)
	}

	return tempArray
}
