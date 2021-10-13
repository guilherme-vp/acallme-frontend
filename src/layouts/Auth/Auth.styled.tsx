import { Grid } from '@mui/material'
import styled from 'styled-components'

export const Container = styled(Grid)`
	background-color: ${props => props.theme.background.main};
	min-height: 100vh;

	@media only screen and (min-width: 768px) {
		padding: 0 60px;
	}
`

export const Content = styled(Grid)`
	padding: 60px 15px;
	border-radius: 0;
	margin: 0;

	@media only screen and (min-width: 768px) {
		border-radius: 10px;
		padding: 0px 20px;
		min-height: 100%;
	}
`
