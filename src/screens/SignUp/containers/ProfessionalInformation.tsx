import React from 'react'

import { Autocomplete, Grid, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import rolesEn from 'data/roles/roles.en.json'
import rolesPtBR from 'data/roles/roles.pt-br.json'
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
						rows={5}
					/>
				</Grid>
				<Grid item>
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
					/>
				</Grid>
				<Grid item>
					<Controller
						render={({ field: { onChange, onBlur, value, name, ref } }) => (
							<Autocomplete
								multiple
								options={intl.locale === 'en' ? rolesEn : rolesPtBR}
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
