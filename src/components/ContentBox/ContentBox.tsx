import { Grid, Typography } from '@material-ui/core'
import { useIntl } from 'hooks'
import React from 'react'
import { BoxContainer, BoxDivider, Description, SectionGrid } from './ContentBox.styled'

export const ContentBox = () => {
	const intl = useIntl()

	const nPatients = 500
	const nSpecialists = 500
	const nDiagnosis = 350

	return (
		<BoxContainer>
			<Grid container alignItems="center" justifyContent="space-between" flexGrow={1}>
				<SectionGrid>
					<Grid item>
						<Typography variant="display2">{nPatients}+</Typography>
					</Grid>
					<Grid item>
						<Description>
							{intl.formatMessage({ id: 'home.section.initial.box.patients' })}
						</Description>
					</Grid>
				</SectionGrid>

				<BoxDivider />
				<SectionGrid>
					<Grid item>
						<Typography variant="display2">{nSpecialists}+</Typography>
					</Grid>
					<Grid item>
						<Description>
							{intl.formatMessage({ id: 'home.section.initial.box.specialists' })}
						</Description>
					</Grid>
				</SectionGrid>

				<BoxDivider />
				<SectionGrid>
					<Grid item>
						<Typography variant="display2">{nDiagnosis}+</Typography>
					</Grid>
					<Grid item>
						<Description>
							{intl.formatMessage({ id: 'home.section.initial.box.cases' })}
						</Description>
					</Grid>
				</SectionGrid>
			</Grid>
		</BoxContainer>
	)
}

export default ContentBox
