/* eslint-disable indent */
import React, { useState } from 'react'
import { Grid, Button, Typography } from '@mui/material'
import { useTheme } from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import iziToast from 'izitoast'
import { LoadingButton } from '@mui/lab'
import { useIntl } from 'hooks'
import { RolesEnum, GenderEnum } from 'services/entities'
import { Link } from 'react-router-dom'
import { LOGIN } from 'routes'
import { capitalizeLetter } from 'utils/capitalize-letter'
import {
	AccountInformation,
	PersonalInformation,
	ProfessionalInformation,
	Role,
	SessionDetails
} from './containers'

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
	cnpj?: string
}

export interface ProfessionalForm {
	about: string
	location: string
	areas: string[]
}

export interface SessionForm {
	works: string
	cost: number
}

export const SignUp = () => {
	const intl = useIntl()
	const [step, setStep] = useState(0)
	const [chosen, setChosen] = useState<RolesEnum>()
	const [openModal, setOpenModal] = useState(false)
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
	const professionalMethods = useForm<ProfessionalForm>({
		mode: 'all'
	})
	const sessionMethods = useForm<SessionForm>({
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

	const buttonMessage = ((): string => {
		if (chosen === RolesEnum.Patient) {
			if (step === 2) {
				return intl.formatMessage({ id: 'signup.choose.next.last' })
			}

			return intl.formatMessage({ id: 'signup.choose.next' })
		}

		if (step === 5) {
			return intl.formatMessage({ id: 'signup.choose.next.last' })
		}

		return intl.formatMessage({ id: 'signup.choose.next' })
	})()

	const buttonDisabled = ((): boolean => {
		if (step === 0) {
			return !chosen
		}

		if (step === 1) {
			return !accountMethods.formState.isValid
		}

		if (step === 2) {
			return !personalMethods.formState.isValid
		}

		if (chosen === RolesEnum.Patient) {
			return false
		}

		if (step === 3) {
			return !professionalMethods.formState.isValid
		}

		if (step === 4) {
			return !sessionMethods.formState.isValid
		}

		return false
	})()

	const handleNextStep = (): void => {
		if (step === 0 && chosen) {
			return setStep(step + 1)
		}
		if (step === 1 && accountMethods.formState.isValid) {
			return setStep(step + 1)
		}
		if (step === 2 && personalMethods.formState.isValid) {
			return setStep(step + 1)
		}
		if (step === 3 && professionalMethods.formState.isValid) {
			return setStep(step + 1)
		}
		if (step === 4 && sessionMethods.formState.isValid) {
			console.log(chosen)
			console.log(accountMethods.watch)
			console.log(personalMethods.watch)
			console.log(professionalMethods.watch)
			console.log(sessionMethods.watch)
			setOpenModal(true)
		}

		iziToast.error({
			message: intl.formatMessage({ id: 'signup.form.required' })
		})
	}

	return (
		<form noValidate onSubmit={e => e.preventDefault()}>
			<Grid container item xs={12} justifyContent="center">
				<Grid item xs={12} sx={{ textAlign: 'center' }}>
					<Typography
						align="center"
						variant="display2"
						sx={{ color: theme.colors.alternative }}
					>
						{/* @ts-ignore */}
						{intl.formatMessage({ id: `signup.title.${step}` })}
					</Typography>
				</Grid>
				{step === 0 ? (
					<Role roleChosen={chosen} handleClick={handleChoseRole} />
				) : step === 1 ? (
					<FormProvider {...accountMethods}>
						<AccountInformation role={chosen} />
					</FormProvider>
				) : step === 2 ? (
					<FormProvider {...personalMethods}>
						<PersonalInformation />
					</FormProvider>
				) : step === 3 ? (
					<FormProvider {...professionalMethods}>
						<ProfessionalInformation />
					</FormProvider>
				) : (
					<FormProvider {...sessionMethods}>
						<SessionDetails />
					</FormProvider>
				)}
				<Grid
					container
					item
					justifyContent="center"
					alignItems="center"
					mt={5}
					xs={12}
					md={6}
				>
					{step !== 0 && (
						<Grid item mr={2}>
							<Button variant="outlined" onClick={() => handlePreviousStep()}>
								{capitalizeLetter(
									intl.formatMessage({
										id: 'goBack'
									})
								)}
							</Button>
						</Grid>
					)}
					<Grid item>
						<LoadingButton
							disabled={buttonDisabled}
							onClick={() => handleNextStep()}
							variant="contained"
							type="submit"
						>
							{capitalizeLetter(buttonMessage)}
						</LoadingButton>
					</Grid>
					<Grid item xs={12} mt={2}>
						<Typography variant="h5" textAlign="center">
							{intl.formatMessage({ id: 'signup.alreadyHaveAccount' })}{' '}
							<Link to={LOGIN}>{intl.formatMessage({ id: 'signup.login' })}</Link>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</form>
	)
}

export default SignUp
