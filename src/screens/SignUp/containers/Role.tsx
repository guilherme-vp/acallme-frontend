import { Grid, Typography } from '@mui/material'
import React from 'react'
import { RolesEnum } from 'services/entities'
import { CardButton } from '../../../components/CardButton'
import { useIntl } from '../../../hooks'
import patient from '../../../assets/images/signup-patient.png'
import specialist from '../../../assets/images/signup-specialist.png'
import { ChosenImage } from '../SignUp.styled'

export interface RoleProps {
	roleChosen?: RolesEnum
	handleClick: (role: RolesEnum) => void
}

export const Role = ({ roleChosen, handleClick }: RoleProps) => {
	const intl = useIntl()

	return (
		<Grid container justifyContent="center" mt={3} spacing={2}>
			<Grid container item xs={12} md={5}>
				<CardButton
					fullWidth
					variant="outlined"
					selected={roleChosen === RolesEnum.Patient}
					onClick={() => handleClick(RolesEnum.Patient)}
				>
					<ChosenImage src={patient} alt="patient-option" />
					<Typography variant="h4">
						{intl.formatMessage({ id: 'patient' }).toUpperCase()}
					</Typography>
				</CardButton>
			</Grid>
			<Grid container item xs={12} md={5}>
				<CardButton
					fullWidth
					variant="outlined"
					color="success"
					selected={roleChosen === RolesEnum.Specialist}
					onClick={() => handleClick(RolesEnum.Specialist)}
				>
					<ChosenImage src={specialist} alt="specialist-option" />
					<Typography variant="h4">
						{intl.formatMessage({ id: 'specialist' }).toUpperCase()}
					</Typography>
				</CardButton>
			</Grid>
		</Grid>
	)
}

export default Role
