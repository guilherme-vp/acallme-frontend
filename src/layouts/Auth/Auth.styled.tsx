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
	padding: 60px 15px;
	border-radius: 0;
	margin: 0;

	@media only screen and (min-width: 768px) {
		border-radius: 10px;
		padding: 40px 20px;
		min-height: 100%;
	}
`
