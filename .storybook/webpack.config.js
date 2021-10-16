module.exports = async ({ config }) => {
	config.resolve.alias['@mui/styled-engine'] = '@mui/styled-engine-sc'
	// Make whatever fine-grained changes you need

	// Return the altered config
	return config
}
