import styled from 'styled-components'

import { Box } from '@mui/material'
import { alpha } from '@mui/system'

export const SearchContainer = styled(Box)`
	display: flex;
	align-items: center;
	background-color: ${props => alpha(props.theme.colors.secondary, 0.08)};
	padding: 24px 16px;
	width: 100%;
	border-radius: 12px;
`
