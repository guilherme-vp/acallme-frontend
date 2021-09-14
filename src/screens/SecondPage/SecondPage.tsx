import React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { Divider, Typography } from '@material-ui/core'

import { HOME } from 'routes'
import { useIntl } from 'hooks'

export const SecondPage = (props: RouteComponentProps) => {
	const intl = useIntl()

	return (
		<>
			<Typography variant="h5">{intl.formatMessage({ id: 'secondPage.title' })}</Typography>
			<Divider />
			<br />
			<Link to={HOME}>{intl.formatMessage({ id: 'secondPage.link' })}</Link>
		</>
	)
}

export default SecondPage
