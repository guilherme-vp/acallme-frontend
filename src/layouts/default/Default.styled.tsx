import { Divider } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled.div`
	min-height: 100vh;
	background-color: ${props => props.theme.background.main};
	padding: 16px;

	@media only screen and (min-width: 600px) {
		padding-left: 24px;
		padding-right: 24px;
	}

	@media only screen and (min-width: 960px) {
		padding-left: 80px;
		padding-right: 80px;
	}

	@media only screen and (min-width: 1280px) {
		padding-left: 144px;
		padding-right: 144px;
	}
`

export const Main = styled.main`
	flex-grow: 1;
	display: flex;
`

export const LayoutDivider = styled(Divider).attrs({ flexItem: true })`
	margin: 24px 0;
`
