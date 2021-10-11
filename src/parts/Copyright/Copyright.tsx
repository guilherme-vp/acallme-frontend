import { Typography } from '@mui/material'
import { useIntl } from 'hooks'
import React from 'react'

export const Copyright = () => {
	const intl = useIntl()

	return (
		<Typography textAlign="center">
			{intl.formatMessage({ id: 'home.footer.copyright' })}
		</Typography>
	)
}

export default Copyright
