import React, { useState } from 'react'

import { useTheme } from 'styled-components'

import { LoadingButton } from '@mui/lab'
import { Grid, Typography, Hidden, TextField, IconButton } from '@mui/material'
import iziToast from 'izitoast'
import { useForm } from 'react-hook-form'
import {
	MdArrowBack as ArrowBackIcon,
	MdLock as PasswordIcon,
	MdPermContactCalendar as IdentityIcon
} from 'react-icons/md'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'

import doctorImage from 'assets/images/login-image.png'
import { InputIconContainer } from 'components/InputAdornment'
import { PasswordInput } from 'components/PasswordInput'
import { useIntl, useStoreon } from 'hooks'
import { ChoseRole } from 'parts/ChoseRole'
import { SCHEDULE, SIGNUP } from 'routes'
import { loginPatient, LoginResponse as LoginPResponse } from 'services/api/patient'
import { loginSpecialist, LoginResponse as LoginSResponse } from 'services/api/specialist'
import { RolesEnum } from 'services/entities'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { BorderedGrid, Image } from './Login.styled'

export interface LoginForm {
	username: string
	password: string
}

export const Login = () => {
	const theme = useTheme()
	const { dispatch } = useStoreon()
	const intl = useIntl()
	const navigation = useNavigate()
	const { isLoading: loadingPatient, mutateAsync: mutatePatient } =
		useMutation(loginPatient)
	const { isLoading: loadingSpecialist, mutateAsync: mutateSpecialist } =
		useMutation(loginSpecialist)
	const [step, setStep] = useState(0)
	const [chosen, setChosen] = useState<RolesEnum>()
	const {
		register,
		formState: { errors, isValid },
		watch,
		getValues,
		reset
	} = useForm<LoginForm>({
		mode: 'all'
	})

	const allFields = watch()

	const handleSubmit = async () => {
		const formData = getValues()

		function setData(data: LoginPResponse | LoginSResponse, role: RolesEnum) {
			const { token, user } = data

			dispatch('user/set', { user, token, loadingUser: false, role })
			navigation(SCHEDULE)
		}

		if (chosen === RolesEnum.Patient) {
			const mutationData = await mutatePatient(formData)

			setData(mutationData, RolesEnum.Patient)
		}
		if (chosen === RolesEnum.Specialist) {
			const mutationData = await mutateSpecialist(formData)

			setData(mutationData, RolesEnum.Specialist)
		}
	}

	const handleChoseRole = (role: RolesEnum) => {
		setChosen(role)
	}

	const buttonMessage = ((): string => {
		if (step === 0) {
			return intl.formatMessage({ id: 'continue' })
		}

		return intl.formatMessage({ id: 'login.submit' })
	})()

	const handleNextStep = async (): Promise<void> => {
		if (step === 0 && chosen) {
			return setStep(step + 1)
		}

		if (step === 1 && isValid) {
			return handleSubmit()
		}

		iziToast.error({
			message: intl.formatMessage({ id: 'login.error' })
		})
	}

	const handlePreviousStep = (): void => {
		reset()
		setStep(step - 1)
	}

	const buttonDisabled = ((): boolean => {
		if (step === 0 || !chosen) {
			return !chosen
		}

		if (step === 1) {
			return !isValid
		}

		return false
	})()

	return (
		<Grid container justifyContent="space-between" alignItems="center">
			{/* <Hidden mdDown> */}
			<Grid item xs={12} md={6}>
				<Image loading="lazy" src={doctorImage} alt="login-doctor" />
			</Grid>
			{/* </Hidden> */}
			<BorderedGrid
				container
				item
				alignItems="center"
				justifyContent="center"
				xs={12}
				md={5}
			>
				<form noValidate onSubmit={e => e.preventDefault()}>
					<Grid container flexDirection="column" alignItems="center" spacing={2}>
						<Grid container item xs={12}>
							{step !== 0 && (
								<IconButton onClick={() => handlePreviousStep()}>
									<ArrowBackIcon />
								</IconButton>
							)}
						</Grid>
						<Grid item>
							<Typography
								variant="display3"
								fontWeight={600}
								sx={{ color: theme.colors.alternative }}
								textAlign="center"
							>
								{intl.formatMessage({ id: 'login.title' })}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h3" color="GrayText" fontWeight={600} textAlign="center">
								{/* @ts-ignore */}
								{intl.formatMessage({ id: `login.description.${step}` })}
							</Typography>
						</Grid>
					</Grid>
					{step === 0 ? (
						<ChoseRole cardSize="small" roleChosen={chosen} handleClick={handleChoseRole} />
					) : (
						<Grid
							container
							item
							justifyContent="center"
							flexDirection="column"
							spacing={2}
							mt={4}
						>
							<Grid item>
								<TextField
									{...register('username', { required: true, minLength: 1 })}
									fullWidth
									label={capitalizeLetter(intl.formatMessage({ id: 'email' }))}
									variant="outlined"
									required
									error={!!errors.username}
									name="username"
									autoComplete="email"
									placeholder={intl.formatMessage({
										id:
											chosen === RolesEnum.Patient
												? 'login.option.username.placeholder'
												: 'login.option.username.specialist.placeholder'
									})}
									InputProps={{
										startAdornment: (
											<InputIconContainer position="start">
												<IdentityIcon />
											</InputIconContainer>
										)
									}}
								/>
							</Grid>
							<Grid item>
								<PasswordInput
									{...register('password', { required: true, minLength: 1 })}
									fullWidth
									required
									error={!!errors.password}
									label={capitalizeLetter(intl.formatMessage({ id: 'password' }))}
									isCorrect={allFields.password ? !errors.password : true}
									name="password"
									autoComplete="password"
									InputProps={{
										startAdornment: (
											<InputIconContainer position="start">
												<PasswordIcon />
											</InputIconContainer>
										)
									}}
								/>
							</Grid>
						</Grid>
					)}
					<Grid container item justifyContent="center" mt={4}>
						<LoadingButton
							onClick={() => handleNextStep()}
							variant="contained"
							type="submit"
							disabled={buttonDisabled}
							loading={loadingSpecialist || loadingPatient}
						>
							{buttonMessage.toUpperCase()}
						</LoadingButton>
					</Grid>
					<Grid item xs={12} mt={4}>
						<Typography variant="h5" textAlign="center">
							{intl.formatMessage({ id: 'login.dontHaveAnAccount' })}{' '}
							<Link to={SIGNUP}>{intl.formatMessage({ id: 'login.createAccount' })}</Link>
						</Typography>
					</Grid>
				</form>
			</BorderedGrid>
		</Grid>
	)
}

export default Login
