import { Box, Divider, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'

export const BoxContainer = styled(Box)`
	background-color: ${props => props.theme.colors.darker};
	color: ${props => props.theme.tags.white};
	border-radius: 12px;
	padding: 40px;
	width: 100%;

	@media only screen and (max-width: 968px) {
		margin-top: 24px;
		padding: 12px 24px;
	}
`

export const Description = styled(Typography).attrs({ variant: 'h4' })`
	margin-top: 4px;
	color: ${props => props.theme.grey.secondary};
`

export const SectionGrid = styled(Grid).attrs({
	container: true,
	item: true,
	xs: 12,
	sm: true,
	direction: 'column',
	justifyContent: 'center',
	alignItems: 'center'
})`
	@media only screen and (max-width: 600px) {
		padding: 16px;

		&:not(:last-child) {
			border-bottom: 1px solid ${props => props.theme.grey.main};
			border-radius: 2px;
		}
	}
`

export const BoxDivider = styled(Divider).attrs({
	variant: 'fullWidth',
	flexItem: true,
	orientation: 'vertical'
})`
	border-color: ${props => props.theme.grey.main};
`
