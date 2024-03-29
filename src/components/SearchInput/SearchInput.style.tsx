import styled from 'styled-components'

import { Paper, InputBase } from '@mui/material'
import { alpha } from '@mui/system'

export const SearchContainer = styled(Paper)`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 5.5px 12px;
	border-radius: 8px;
	background-color: ${props => alpha(props.theme.grey.fourth, 0.6)};
	border: 1px solid ${props => props.theme.border.darker};
	color: ${props => props.theme.text.main};
	box-shadow: none !important;

	i {
		color: ${props => props.theme.text.description};
	}
`

export const SearchInputBase = styled(InputBase).attrs({
	fullWidth: true
})`
	margin: 0 4px;
	font-size: 14px;
	color: ${props => props.theme.text.description};
`
