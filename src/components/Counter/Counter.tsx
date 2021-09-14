import React from 'react'
import { useIntl, useStoreon } from 'hooks'
import { Typography } from '@material-ui/core'
import { CounterButton } from './Counter.styled'

export const Counter = () => {
	const { dispatch, counter } = useStoreon('counter')
	const intl = useIntl()
	return (
		<div>
			<div>
				<CounterButton type="button" onClick={() => dispatch('counter/increment')}>
					{intl.formatMessage({ id: 'counter.increment' })}
				</CounterButton>
				&nbsp;&nbsp;
				<CounterButton type="button" onClick={() => dispatch('counter/decrement')}>
					{intl.formatMessage({ id: 'counter.decrement' })}
				</CounterButton>
			</div>
			<br />

			<Typography variant="h6">
				{intl.formatMessage({ id: 'counter.count' }, { value: counter })}
			</Typography>
		</div>
	)
}

export default Counter
