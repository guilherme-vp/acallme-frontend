import React from 'react'

import { useTheme } from 'styled-components'

import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { MdMonetizationOn as CostIcon, MdWatchLater as ClockIcon } from 'react-icons/md'

import { useIntl } from 'hooks'
import { capitalizeLetter } from 'utils/capitalize-letter'

import type { SessionForm } from '../SignUp'

export const SessionDetails = () => {
	const hourOptions = '1 hour'
	const theme = useTheme()
	const intl = useIntl()
	const {
		register,
		formState: { errors }
	} = useFormContext<SessionForm>()

	return (
		<Grid container item mt={3} justifyContent="center" spacing={2}>
			<Grid container item justifyContent="space-between" xs={12} md={7} spacing={1}>
				<Grid item xs>
					<Autocomplete
						options={[hourOptions]}
						defaultValue={hourOptions}
						disabled
						sx={{ backgroundColor: theme.background.disabled }}
						renderInput={params => (
							<TextField
								focused
								{...params}
								name="duration"
								defaultValue={hourOptions}
								label={capitalizeLetter(intl.formatMessage({ id: 'duration' }))}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<ClockIcon />
										</InputAdornment>
									)
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs>
					<TextField
						focused
						{...register('cost', {
							required: true
						})}
						required
						error={!!errors.cost}
						placeholder="100.00"
						label={intl.formatMessage({ id: 'signup.form.session.cost' })}
						name="cost"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<CostIcon />
								</InputAdornment>
							)
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default SessionDetails
