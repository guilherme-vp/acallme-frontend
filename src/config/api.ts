const { NODE_URL, JAVA_URL } = process.env

export const apiUrls = {
	node: NODE_URL || 'http://localhost:5005',
	java: JAVA_URL || 'http://localhost:8080'
}
