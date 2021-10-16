import styled from 'styled-components'

import { Button, Paper, Avatar } from '@mui/material'

export const CardContainer = styled(Paper).attrs({ elevation: 0 })`
	padding: 16px;
	display: flex;
	align-items: center;
	width: 100%;
	border-radius: 16px !important;
	background-color: ${props => props.theme.background.light};
	border: 1px solid ${props => props.theme.border.darker};

	@media only screen and (min-width: 768px) {
		max-width: 350px;
	}
`

export const BookButton = styled(Button).attrs({
	sx: {
		borderRadius: '24px',
		fontWeight: 600,
		paddingRight: '16px',
		paddingLeft: '16px'
	}
})`
	margin-top: 8px;

	@media only screen and (min-width: 768px) {
		margin-top: 0;
	}
`

export const MiniAvatar = styled(Avatar).attrs({ sx: { width: 56, height: 56 } })`
	border: 4px solid ${props => props.theme.tags.white};
	box-shadow: -2px 4px 6px 0 rgba(0, 0, 0, 0.2);
`
