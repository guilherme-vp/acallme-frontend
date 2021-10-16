/* eslint-disable react/jsx-no-duplicate-props */
import React, { useCallback, useState } from 'react'

import { DesktopDatePicker } from '@mui/lab'
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
	useMediaQuery
} from '@mui/material'
import { Theme } from '@mui/system'
import * as datefns from 'date-fns'
import iziToast from 'izitoast'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import {
	MdOutlineAddAPhoto as PhotoIcon,
	MdPhoneInTalk as PhoneIcon,
	MdPerson as NameIcon
} from 'react-icons/md'

import { InputIconContainer } from 'components/InputAdornment'
import { useIntl } from 'hooks'
import { GenderEnum } from 'services/entities'
import { capitalizeLetter } from 'utils/capitalize-letter'

import type { PersonalForm } from '../SignUp'
import { ImageAvatar, ImageSelector, PhotoContainer } from '../SignUp.styled'

export const PersonalInformation = () => {
	const intl = useIntl()
	const [avatar, setAvatar] = useState<string>()
	const [, setAvatarFile] = useState<File>()
	const { register, setValue, watch } = useFormContext<PersonalForm>()
	const isSmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	const maxDate = datefns.subYears(new Date(), 18)
	const minDate = datefns.subYears(new Date(), 90)

	const { birth, gender } = watch()

	const onDrop = useCallback(([file], [error]) => {
		if (file) {
			setAvatar(URL.createObjectURL(file))
			setAvatarFile(file)
		}

		error?.errors.forEach(({ code }: { code: any }) => {
			if (code === 'file-invalid-type') {
				return iziToast.error({
					message: intl.formatMessage({ id: 'restrictedFileFormat' })
				})
			}

			if (code === 'file-too-large') {
				return iziToast.error({
					message: intl.formatMessage({ id: 'maximumFileSize' })
				})
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: ['image/jpeg', 'image/png'],
		// 2mb
		maxSize: 2000000,
		multiple: false,
		preventDropOnDocument: false
	})

	return (
		<Grid
			container
			justifyContent={isSmDown ? 'center' : 'space-between'}
			mt={3}
			spacing={2}
		>
			<Grid item xs={12} md={5}>
				<PhotoContainer>
					{avatar ? (
						<>
							<ImageAvatar {...getRootProps()} src={avatar} />
							<div className="image-selector" {...getRootProps()}>
								<input {...getInputProps()} type="file" accept="image/*" />
								<PhotoIcon />
							</div>
						</>
					) : (
						<ImageSelector {...getRootProps()}>
							<input {...getInputProps()} type="file" accept="image/*" />
							<p>{intl.formatMessage({ id: 'signup.form.personal.photo' })}</p>
						</ImageSelector>
					)}
				</PhotoContainer>
			</Grid>
			<Grid container item flexDirection="column" spacing={2} xs={12} md>
				<Grid item>
					<TextField
						focused
						fullWidth
						label={capitalizeLetter(intl.formatMessage({ id: 'name' }))}
						variant="outlined"
						placeholder="Ex: Guilherme Vieira"
						required
						{...register('name', { required: true, minLength: 3 })}
						InputProps={{
							startAdornment: (
								<InputIconContainer position="start">
									<NameIcon />
								</InputIconContainer>
							)
						}}
					/>
				</Grid>
				<Grid item>
					<FormControl component="fieldset">
						<FormLabel component="legend">
							{capitalizeLetter(intl.formatMessage({ id: 'gender' }))}*
						</FormLabel>
						<RadioGroup row value={gender}>
							<FormControlLabel
								value={GenderEnum.F}
								control={<Radio {...register('gender', { required: true })} />}
								label={capitalizeLetter(intl.formatMessage({ id: 'female' }))}
							/>
							<FormControlLabel
								value={GenderEnum.M}
								control={<Radio {...register('gender', { required: true })} />}
								label={capitalizeLetter(intl.formatMessage({ id: 'male' }))}
							/>
							<FormControlLabel
								value={GenderEnum.N}
								control={<Radio {...register('gender', { required: true })} />}
								label={capitalizeLetter(intl.formatMessage({ id: 'other' }))}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item>
					<DesktopDatePicker
						label={capitalizeLetter(intl.formatMessage({ id: 'birthDate' }))}
						inputFormat="dd/MM/yyyy"
						minDate={minDate}
						maxDate={maxDate}
						disableFuture
						mask="__/__/____"
						onChange={value => setValue('birth', value)}
						value={birth}
						renderInput={props => <TextField focused required {...props} />}
					/>
				</Grid>
				<Grid item>
					<TextField
						{...register('phone', { required: true, maxLength: 15, minLength: 11 })}
						fullWidth
						label={capitalizeLetter(intl.formatMessage({ id: 'phone' }))}
						variant="outlined"
						placeholder="Ex: (11) 99999-9999"
						required
						inputProps={{ minLength: 11, maxLength: 15 }}
						InputProps={{
							startAdornment: (
								<InputIconContainer position="start">
									<PhoneIcon />
								</InputIconContainer>
							)
						}}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PersonalInformation
