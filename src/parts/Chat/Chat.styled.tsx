import styled from 'styled-components'

import { Box } from '@mui/material'

export const ChatContainer = styled.main`
	height: 100%;
	flex: 1 1 70%;
`

export const MessageWrapper = styled(Box)`
	max-height: 600px;
	overflow-y: scroll;
	border: 1px solid ${props => props.theme.border.darker};
	border-radius: 14px;
	margin-bottom: 16px;
	min-height: 600px;
	padding-top: 24px;
	padding-bottom: 24px;
`

export const SenderContainer = styled(Box)`
	width: 100%;
`
