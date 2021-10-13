import React from 'react'

import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { PasswordInput } from 'components/PasswordInput'
import { useIntl } from 'hooks'
import { RolesEnum } from 'services/entities'
import { capitalizeLetter } from 'utils/capitalize-letter'
import { cnpjRegex, cpfRegex, createStringRequirements, emailRegex } from 'utils/regexs'

import type { AccountForm } from '../SignUp'

const passwordRegex = createStringRequirements({ includeSpecial: false })

interface RoleProp {
	role?: RolesEnum
}

export const AccountInformation = ({ role }: RoleProp) => {
	const intl = useIntl()
	const {
		register,
		formState: { errors },
		watch
	} = useFormContext<AccountForm>()
	const allFields = watch()

	return (
		<Grid container item mt={3} justifyContent="center">
			<Grid container item flexDirection="column" spacing={2} xs={12} md={7}>
				<Grid item>
					<TextField
						focused
						{...register('email', {
							required: true,
							pattern: emailRegex
						})}
						fullWidth
						label={capitalizeLetter(intl.formatMessage({ id: 'email' }))}
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
					<TextField
						focused
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
						inputProps={{ maxLength: 14 }}
					/>
				</Grid>
				{role === RolesEnum.Specialist && (
					<Grid item>
						<TextField
							focused
							{...register('cnpj', {
								required: true,
								pattern: cnpjRegex
							})}
							fullWidth
							label={intl.formatMessage({ id: 'cnpj' })}
							variant="outlined"
							required
							error={!!errors.cnpj}
							placeholder="12.345.678/0001-90"
							name="cnpj"
							autoComplete="cnpj"
							inputProps={{ maxLength: 18 }}
						/>
					</Grid>
				)}
				<Grid item>
					<PasswordInput
						{...register('password', {
							required: true,
							pattern: passwordRegex
						})}
						helperText={capitalizeLetter(
							intl.formatMessage({ id: 'signup.form.account.password.helper' })
						)}
						fullWidth
						required
						error={!!errors.password}
						label={capitalizeLetter(intl.formatMessage({ id: 'password' }))}
						isCorrect={allFields.password ? !errors.password : true}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default AccountInformation
