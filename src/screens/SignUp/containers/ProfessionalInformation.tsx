import React from 'react'

import { Autocomplete, Grid, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { MdCreate as AboutIcon } from 'react-icons/md'

import { InputIconContainer } from 'components/InputAdornment'
import roles from 'data/roles/roles.json'
import { useIntl } from 'hooks'

import type { ProfessionalForm } from '../SignUp'

export const ProfessionalInformation = () => {
	const intl = useIntl()
	const {
		register,
		formState: { errors },
		control
	} = useFormContext<ProfessionalForm>()

	return (
		<Grid container item mt={3} justifyContent="center">
			<Grid container item flexDirection="column" spacing={2} xs={12} md={7}>
				<Grid item>
					<TextField
						focused
						// @ts-ignore
						{...register('about', {
							required: true,
							maxLength: 300
						})}
						fullWidth
						required
						multiline
						label={intl.formatMessage({ id: 'signup.form.professional.about' })}
						variant="outlined"
						placeholder={intl.formatMessage({
							id: 'signup.form.professional.about.placeholder'
						})}
						error={!!errors.about}
						name="about"
						rows={3}
						InputProps={{
							startAdornment: (
								<InputIconContainer position="start">
									<AboutIcon />
								</InputIconContainer>
							)
						}}
					/>
				</Grid>
				{/* <Grid item>
					<TextField
						focused
						{...register('location', {
							required: true
						})}
						fullWidth
						required
						label={intl.formatMessage({ id: 'signup.form.professional.location' })}
						variant="outlined"
						placeholder="Ex: São Paulo, São Paulo"
						error={!!errors.location}
						name="location"
						InputProps={{
							startAdornment: (
								<InputIconContainer position="start">
									<LocationIcon />
								</InputIconContainer>
							)
						}}
					/>
				</Grid> */}
				<Grid item>
					<Controller
						render={({ field: { onChange, value, name, ref } }) => (
							<Autocomplete
								multiple
								options={roles}
								filterSelectedOptions
								value={value}
								onChange={(_, res) => {
									onChange(res)
								}}
								renderInput={params => (
									<TextField
										focused
										{...params}
										name={name}
										inputRef={ref}
										required
										label={intl.formatMessage({ id: 'signup.form.professional.areas' })}
									/>
								)}
							/>
						)}
						control={control}
						name="specialties"
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ProfessionalInformation
