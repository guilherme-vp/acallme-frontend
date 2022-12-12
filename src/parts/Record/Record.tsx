import React from 'react'

import { Divider, Slide, Typography, IconButton, Grid, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { MdClose as CloseIcon, MdLocalHospital as DiagnosisIcon } from 'react-icons/md'

import { InputIconContainer } from 'components/InputAdornment'
import { useIntl } from 'hooks'
import { Record as RecordEntity } from 'services/entities'

import * as S from './Record.styled'

export type FormProps = Pick<RecordEntity, 'diagnosis' | 'observation'>

export interface RecordProps {
	open: boolean
	onSubmit: (data: FormProps) => void
	handleClose: () => void
}

export const Record = ({ open, handleClose, onSubmit }: RecordProps) => {
	const intl = useIntl()
	const { register, formState } = useForm<FormProps>({ mode: 'all' })

	const { errors } = formState

	return (
		<Slide direction="left" in={open}>
			<S.RecordContainer>
				<S.Header>
					<Typography variant="body1">
						{intl.formatMessage({ id: 'record.title' })}
					</Typography>
					<IconButton onClick={() => handleClose()} sx={{ fontSize: 18 }}>
						<CloseIcon />
					</IconButton>
				</S.Header>
				<Divider />
				<S.RecordWrapper>
					<Grid container alignItems="stretch" spacing={3}>
						<Grid item xs={12}>
							<Typography variant="body1" textAlign="center" color="text.secondary">
								{intl.formatMessage({ id: 'record.description' })}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...register('diagnosis', { required: true, minLength: 1 })}
								fullWidth
								label={intl.formatMessage({ id: 'record.diagnosis' })}
								variant="outlined"
								required
								error={!!errors.diagnosis}
								name="diagnosis"
								placeholder={intl.formatMessage({ id: 'record.diagnosis.placeholder' })}
								InputProps={{
									startAdornment: (
										<InputIconContainer position="start">
											<DiagnosisIcon />
										</InputIconContainer>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} sx={{ marginTop: '16px' }}>
							<TextField
								{...register('observation')}
								fullWidth
								label={intl.formatMessage({ id: 'record.observation' })}
								variant="outlined"
								error={!!errors.observation}
								name="observation"
								multiline
								rows={10}
								placeholder={intl.formatMessage({ id: 'record.observation.placeholder' })}
							/>
						</Grid>
					</Grid>
				</S.RecordWrapper>
			</S.RecordContainer>
		</Slide>
	)
}

export default Record
