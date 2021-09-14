import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { RouteComponentProps, Link } from '@reach/router'

import { useIntl } from 'hooks'
import { SECOND_PAGE } from 'routes'
import { Counter } from 'components/Counter'

export const Home = (props: RouteComponentProps) => {
	const intl = useIntl()

	return (
		<div>
			<Typography variant="h5">{intl.formatMessage({ id: 'home.title' })}</Typography>
			<Divider />
			<br />
			<Link to={SECOND_PAGE}>{intl.formatMessage({ id: 'home.link' })}</Link>
			<br />
			<br />
			<Counter />
		</div>
	)
}

export default Home
