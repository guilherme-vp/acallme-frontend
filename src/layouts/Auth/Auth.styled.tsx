import { Divider, Grid } from '@mui/material'
import styled from 'styled-components'

export const Container = styled(Grid)`
	padding: 20px;
	background-color: ${props => props.theme.background.main};
	min-height: 100vh;

	@media only screen and (min-width: 600px) {
		padding: 20px 60px;
	}
`

export const Content = styled(Grid)`
	padding: 40px 60px;
	border-radius: 10px;
	min-height: 100%;

	@media only screen and (max-width: 600px) {
		width: 100%;
		min-height: 100vh;
		border-radius: 0;
		margin: 0;
		padding: 60px 15px;
	}
`

export const LayoutDivider = styled(Divider).attrs({ flexItem: true })`
	margin: 24px 0;
`
