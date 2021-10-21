/* eslint-disable indent */
import styled from 'styled-components'

import { Box, Fab, IconButton } from '@mui/material'

export const SettingsContainer = styled(Box)`
	background-color: ${props => props.theme.background.videocall};
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 8px 16px;

	@media only screen and (min-width: 768px) {
		padding: 8px 36px;
	}
`

export const OptionButton = styled(IconButton).withConfig<{
	isHangout?: boolean
	isOff?: boolean
}>({
	shouldForwardProp: props => !['isHangout', 'isOff'].includes(props)
})`
	background-color: ${({ theme, isHangout, isOff }) =>
		isHangout || isOff ? theme.tags.red : theme.grey.fifth};
	color: ${props => props.theme.tags.white};

	${({ isHangout }) =>
		isHangout && { paddingLeft: '16px', paddingRight: '16px', borderRadius: '24px' }}

	&:hover {
		background-color: ${({ theme, isHangout, isOff }) =>
			isHangout || isOff ? theme.tags.red : theme.grey.fifth};
	}
`

export const FabButton = styled(Fab)`
	position: absolute;
	right: 16px;
	width: 50px;
	height: 50px;
	background-color: ${({ theme }) => theme.grey.fifth};
	color: ${props => props.theme.tags.white};

	&:hover {
		background-color: ${({ theme }) => theme.grey.fifth};
	}
`
