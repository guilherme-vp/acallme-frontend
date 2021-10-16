/* eslint-disable indent */
import React, { useState } from 'react'

import { useTheme } from 'styled-components'

import { LoadingButton } from '@mui/lab'
import { Grid, Button, Typography } from '@mui/material'
import iziToast from 'izitoast'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

import { useIntl } from 'hooks'
import { ChoseRole } from 'parts/ChoseRole'
import { LOGIN } from 'routes'
import { RolesEnum, User, Specialist } from 'services/entities'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { StyledForm } from './SignUp.styled'
import { SuccessModal } from './components/SuccessModal'
import {
	AccountInformation,
	PersonalInformation,
	ProfessionalInformation,
	SessionDetails
} from './containers'

export type PersonalForm = Pick<User, 'name' | 'birth' | 'phone' | 'gender'> & {
	photo?: File
}

export type AccountForm = Pick<Specialist, 'email' | 'password' | 'cpf' | 'cnpj'>

export type ProfessionalForm = Pick<Specialist, 'about' | 'crm' | 'crp' | 'location'> & {
	specialties: string[]
}

export interface SessionForm {
	cost: number
}

export const SignUp = () => {
	const intl = useIntl()
	const history = useHistory()
	const [step, setStep] = useState(0)
	const [chosen, setChosen] = useState<RolesEnum>()
	const [openModal, setOpenModal] = useState(false)
	const theme = useTheme()
	const personalMethods = useForm<PersonalForm>({
		mode: 'all'
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

	const handleSubmit = () => {
		const personalValues = personalMethods.getValues()
		const accountValues = accountMethods.getValues()
		const professionalValues = professionalMethods.getValues()
		const sessionValues = sessionMethods.getValues()

		console.log(personalValues, accountValues, professionalValues, sessionValues)
		history.push(LOGIN)

		setOpenModal(true)
	}

	const buttonMessage = ((): string => {
		if (chosen === RolesEnum.Patient) {
			if (step === 2) {
				return intl.formatMessage({ id: 'signup.choose.next.last' })
			}

			return intl.formatMessage({ id: 'signup.choose.next' })
		}

		if (step === 4) {
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
			if (chosen === RolesEnum.Patient) {
				return handleSubmit()
			}

			return setStep(step + 1)
		}

		if (step === 3 && professionalMethods.formState.isValid) {
			return setStep(step + 1)
		}
		if (step === 4 && sessionMethods.formState.isValid) {
			return handleSubmit()
		}

		iziToast.error({
			message: intl.formatMessage({ id: 'signup.form.required' })
		})
	}

	return (
		<StyledForm noValidate onSubmit={e => e.preventDefault()}>
			<Grid container item xs={12} md={10} justifyContent="center">
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
					<ChoseRole roleChosen={chosen} handleClick={handleChoseRole} />
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
					<Grid item xs={12} mt={4}>
						<Typography variant="h5" textAlign="center">
							{intl.formatMessage({ id: 'signup.alreadyHaveAccount' })}{' '}
							<Link to={LOGIN}>{intl.formatMessage({ id: 'signup.login' })}</Link>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<SuccessModal open={openModal} onClose={() => setOpenModal(false)} />
		</StyledForm>
	)
}

export default SignUp
