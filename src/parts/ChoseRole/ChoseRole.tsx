import React from 'react'

import { Grid, Typography } from '@mui/material'

import patient from 'assets/images/signup-patient.png'
import specialist from 'assets/images/signup-specialist.png'
import { CardButton } from 'components/CardButton'
import { useIntl } from 'hooks'
import { RolesEnum } from 'services/entities'

import { ChosenImage } from '../../screens/SignUp/SignUp.styled'

export interface RoleProps {
	roleChosen?: RolesEnum
	handleClick: (role: RolesEnum) => void
	cardSize?: 'small' | 'large'
}

export const ChoseRole = ({ roleChosen, handleClick, cardSize }: RoleProps) => {
	const intl = useIntl()

	return (
		<Grid container item justifyContent="center" mt={3} spacing={2}>
			<Grid container item xs={12} sm={5}>
				<CardButton
					fullWidth
					variant="outlined"
					selected={roleChosen === RolesEnum.Patient}
					onClick={() => handleClick(RolesEnum.Patient)}
					size={cardSize}
				>
					<ChosenImage src={patient} alt="patient-option" />
					<Typography variant="h4">
						{intl.formatMessage({ id: 'patient' }).toUpperCase()}
					</Typography>
				</CardButton>
			</Grid>
			<Grid container item xs={12} sm={5}>
				<CardButton
					fullWidth
					variant="outlined"
					color="success"
					selected={roleChosen === RolesEnum.Specialist}
					onClick={() => handleClick(RolesEnum.Specialist)}
					size={cardSize}
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

export default ChoseRole
