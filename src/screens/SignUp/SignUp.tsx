import React, { useState } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { useTheme } from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import iziToast from 'izitoast'
import { LoadingButton } from '@mui/lab'
import { useIntl } from '../../hooks'
import { RolesEnum, GenderEnum } from '../../services/entities'
import { Role } from './containers/Role'
import { PersonalInformation } from './containers/PersonalInformation'
import { capitalizeLetter } from '../../utils/capitalize-letter'

export interface PersonalForm {
	name: string
	photo?: File
	birth: Date | null
	phone: string
	gender: GenderEnum
}

export interface AccountForm {
	email: string
	password: string
	cpf: string
}

export const SignUp = () => {
	const intl = useIntl()
	const [step, setStep] = useState(0)
	const [chosen, setChosen] = useState<RolesEnum>()
	const theme = useTheme()
	const personalMethods = useForm<PersonalForm>({
		mode: 'all',
		defaultValues: {
			birth: null
		}
	})
	const accountMethods = useForm<AccountForm>({
		mode: 'all'
	})

	const handleChoseRole = (role: RolesEnum) => {
		setChosen(role)
	}

	const handlePreviousStep = () => {
		if (step !== 0) {
			setStep(step - 1)
		}
	}

	const handleNextStep = () => {
		if (step === 0) {
			setStep(step + 1)
		} else if (step === 1) {
			if (personalMethods.formState.isValid) {
				setStep(step + 1)
			} else {
				iziToast.error({
					message: intl.formatMessage({ id: 'signup.form.personal.required' })
				})
			}
		} else if (step === 2) {
			if (accountMethods.formState.isValid) {
				setStep(step + 1)
			} else {
				iziToast.error({
					message: intl.formatMessage({ id: 'signup.form.personal.required' })
				})
			}
		} else if (step === 3) {
		}
	}

	return (
		<Grid container item xs={12}>
			<Grid item xs={12} sx={{ textAlign: 'center' }}>
				{step !== 3 && (
					<Typography
						align="center"
						variant="display2"
						sx={{ color: theme.colors.alternative }}
					>
						{/* @ts-ignore */}
						{intl.formatMessage({ id: `signup.title.${step}` })}
					</Typography>
				)}
			</Grid>
			{step === 0 ? (
				<Role roleChosen={chosen} handleClick={handleChoseRole} />
			) : step === 1 ? (
				<FormProvider {...personalMethods}>
					<PersonalInformation />
				</FormProvider>
			) : (
				<div />
			)}
			<Grid container item justifyContent="center" alignItems="center" mt={5}>
				{step !== 0 && (
					<Grid item mr={2}>
						<Button onClick={() => handlePreviousStep()}>
							{capitalizeLetter(
								intl.formatMessage({
									id: 'goBack'
								})
							)}
						</Button>
					</Grid>
				)}
				<Grid>
					<LoadingButton
						disabled={
							step === 0
								? !chosen
								: step === 1
								? !personalMethods.formState.isValid
								: step === 2
								? !accountMethods.formState.isValid
								: !chosen
						}
						onClick={() => handleNextStep()}
						variant="contained"
					>
						{capitalizeLetter(
							intl.formatMessage({
								id: step !== 2 ? 'signup.choose.next' : 'signup.choose.next.last'
							})
						)}
					</LoadingButton>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default SignUp
