import { Grid } from '@mui/material'
import styled from 'styled-components'

export const Container = styled(Grid)`
	padding: 20px 0;
	background-color: ${props => props.theme.background.main};
	min-height: 100vh;

	@media only screen and (min-width: 768px) {
		padding: 20px 60px;
	}
`

export const Content = styled(Grid)`
	padding: 40px 20px;
	border-radius: 10px;
	min-height: 100%;

	@media only screen and (max-width: 768px) {
		width: 100%;
		border-radius: 0;
		margin: 0;
		padding: 60px 0;
	}
`
