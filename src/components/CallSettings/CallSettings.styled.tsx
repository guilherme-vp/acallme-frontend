import styled from 'styled-components'

import { Box } from '@mui/material'

export const SettingsContainer = styled(Box)`
	background-color: ${props => props.theme.background.disabled};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	opacity: 0.7;
	width: 100%;
	max-width: 500px;
	padding: 12px 24px;
	border-radius: 24px;
`
