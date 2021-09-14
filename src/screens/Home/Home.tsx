import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { RouteComponentProps } from '@reach/router'

import { useIntl } from 'hooks'

export const Home = (props: RouteComponentProps) => {
	const intl = useIntl()

	return (
		<div>
			<Typography variant="h5">{intl.formatMessage({ id: 'home.title' })}</Typography>
			<Divider />
			<br />
		</div>
	)
}

export default Home
