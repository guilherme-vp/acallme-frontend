import styled from 'styled-components'

import { LoadingButton } from '@mui/lab'
import { Grid, Divider, IconButton, Autocomplete, TextField } from '@mui/material'
import { alpha } from '@mui/system'

import { pxToRem } from 'utils/px-to-rem'

export const SearchContainer = styled(Grid)`
	width: 100%;
	padding: 20px 24px;
	background-color: ${props => props.theme.background.calm};
	border: 1px solid ${props => props.theme.border.darker};
	border-radius: 16px;

	@media only screen and (max-width: 600px) {
		padding: 8.5px 12px;
	}
`

export const SearchButton = styled(LoadingButton)`
	padding: 16px;
	border-radius: 12px;
	color: ${props => props.theme.text.main};
	background-color: ${props => alpha(props.theme.colors.primary, 0.2)};
	min-width: 0;
	font-size: ${pxToRem(20)};

	&:hover {
		background-color: ${props => alpha(props.theme.colors.primary, 0.25)};
	}
`

export const SearchIconButton = styled(IconButton).attrs({ color: 'primary' })`
	padding: 8px;
`

export const VerticalDivider = styled(Divider)`
	display: flex;
	margin: 0 24px;
	height: 31px;
	border-color: ${props => props.theme.border.thin};

	@media only screen and (max-width: 600px) {
		margin: 0 12px;
	}
`

export const StyledAutocomplete = styled(Autocomplete)`
	border: 1px solid ${props => props.theme.border.darker};
	border-radius: 8px;
	background-color: ${props => alpha(props.theme.grey.fourth, 0.6)};
`

export const SearchInput = styled(TextField)`
	padding: 5.5px 12px;
	margin: 0 4px;
	color: ${props => props.theme.text.main};
	border: 0 none !important;
	font-size: 14px;
`
