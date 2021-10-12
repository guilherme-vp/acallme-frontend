import React from 'react'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useIntl } from '../../../hooks'
import type { AccountForm } from '../SignUp'
import { cpfRegex, createStringRequirements, emailRegex } from '../../../utils/regexs'
import { PasswordInput } from '../../../components/PasswordInput'

const passwordRegex = createStringRequirements({ includeSpecial: false })

export const AccountInformation = () => {
	const intl = useIntl()
	const {
		register,
		formState: { errors },
		watch
	} = useFormContext<AccountForm>()
	const allFields = watch()

	return (
		<Grid container item mt={5} justifyContent="center">
			<Grid container item flexDirection="column" spacing={2} xs={12} md={7}>
				<Grid item>
					<TextField
						{...register('email', {
							required: true,
							pattern: emailRegex
						})}
						fullWidth
						label={intl.formatMessage({ id: 'email' })}
						variant="outlined"
						placeholder="Ex: email@example.com"
						required
						error={!!errors.email}
						name="email"
						type="email"
						autoComplete="email"
					/>
				</Grid>
				<Grid item>
					<PasswordInput
						{...register('password', {
							required: true,
							pattern: passwordRegex
						})}
						helperText="Sua senha deve conter no mínimo 6 caracteres, uma letra maiúscula, uma minúscula e um número"
						fullWidth
						required
						error={!!errors.password}
						label={intl.formatMessage({ id: 'password' })}
						isCorrect={allFields.password ? !errors.password : true}
					/>
				</Grid>
				<Grid item>
					<TextField
						{...register('cpf', {
							required: true,
							pattern: cpfRegex
						})}
						fullWidth
						label={intl.formatMessage({ id: 'cpf' })}
						variant="outlined"
						required
						error={!!errors.cpf}
						placeholder="123.456.789-10"
						name="cpf"
						autoComplete="cpf"
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default AccountInformation
