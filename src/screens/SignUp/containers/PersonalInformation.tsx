import React, { useCallback, useState } from 'react'
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
import { useDropzone } from 'react-dropzone'
import { DesktopDatePicker } from '@mui/lab'
import * as datefns from 'date-fns'
import { useFormContext } from 'react-hook-form'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import iziToast from 'izitoast'
import { capitalizeLetter } from 'utils/capitalize-letter'
import { useIntl } from '../../../hooks'
import { ImageAvatar, ImageSelector, PhotoContainer } from '../SignUp.styled'
import type { PersonalForm } from '../SignUp'
import { GenderEnum } from '../../../services/entities'

export const PersonalInformation = () => {
	const intl = useIntl()
	const [avatar, setAvatar] = useState<string>()
	const [avatarFile, setAvatarFile] = useState<File>()
	const { register, setValue, watch } = useFormContext<PersonalForm>()
	const isSmDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	const maxDate = datefns.subYears(new Date(), 18)
	const minDate = datefns.subYears(new Date(), 90)

	const { birth, gender, phone } = watch()

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
			mt={5}
			spacing={2}
		>
			<Grid item xs={12} md={5}>
				<PhotoContainer>
					{avatar ? (
						<>
							<ImageAvatar {...getRootProps()} src={avatar} />
							<div className="image-selector" {...getRootProps()}>
								<input {...getInputProps()} type="file" accept="image/*" />
								<MdOutlineAddAPhoto />
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
						fullWidth
						label={intl.formatMessage({ id: 'signup.form.personal.name' })}
						variant="outlined"
						{...register('name', { required: true, minLength: 3 })}
					/>
				</Grid>
				<Grid item>
					<FormControl component="fieldset">
						<FormLabel component="legend">
							{capitalizeLetter(intl.formatMessage({ id: 'gender' }))}
						</FormLabel>
						<RadioGroup row {...register('gender', { required: true })}>
							<FormControlLabel
								value={GenderEnum.F}
								control={<Radio />}
								label={capitalizeLetter(intl.formatMessage({ id: 'female' }))}
							/>
							<FormControlLabel
								value={GenderEnum.M}
								control={<Radio />}
								label={capitalizeLetter(intl.formatMessage({ id: 'male' }))}
							/>
							<FormControlLabel
								value={GenderEnum.N}
								control={<Radio />}
								label={capitalizeLetter(intl.formatMessage({ id: 'other' }))}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item>
					<DesktopDatePicker
						label={intl.formatMessage({ id: 'signup.form.personal.birth' })}
						inputFormat="dd/MM/yyyy"
						minDate={minDate}
						maxDate={maxDate}
						disableFuture
						mask="__/__/____"
						onChange={value => setValue('birth', value)}
						value={birth}
						renderInput={props => <TextField {...props} />}
					/>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						label={intl.formatMessage({ id: 'signup.form.personal.phone' })}
						variant="outlined"
						{...register('phone', { required: true })}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PersonalInformation
