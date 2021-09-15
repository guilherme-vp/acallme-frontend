import { Button, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components'

export const Container = styled(Toolbar)`
	height: 77px;
	padding: 16px;
	border-bottom-left-radius: 24px;
	border-bottom-right-radius: 24px;

	@media only screen and (min-width: 600px) {
		&.MuiToolbar-gutters {
			padding-left: 24px;
			padding-right: 24px;
		}
	}

	@media only screen and (min-width: 960px) {
		&.MuiToolbar-gutters {
			padding-left: 80px;
			padding-right: 80px;
		}
	}

	@media only screen and (min-width: 1280px) {
		&.MuiToolbar-gutters {
			padding: 0 144px;
		}
	}
`

export const Title = styled(Typography)`
	color: ${props => props.theme.colors.primary};
	font-weight: 600;
`

export const Content = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	justify-content: space-between;
	flex: 1 1 auto;
`

export const RightContent = styled.nav`
	display: flex;
	align-items: center;
	height: 100%;
`

export const ContactButton = styled(Button)`
	padding: 6px 20px;
	border-radius: 25px;
	color: ${props => props.theme.tags.white};
	font-weight: 500;
`

export const MenuOption = styled(Typography).attrs({ variant: 'h5' })`
	color: ${props => props.theme.text.description};
	font-weight: 600;
`
