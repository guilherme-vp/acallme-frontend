import styled from 'styled-components'

import { Box } from '@mui/material'

export const Header = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 16px 8px;
`

export const ChatContainer = styled.main`
	display: flex;
	height: 100%;
	flex: 1;
	flex-direction: column;
	padding: 16px;
	border-radius: 16px;
	background-color: ${props => props.theme.background.light};
`

export const MessageWrapper = styled(Box)`
	max-height: max-content;
	overflow-y: scroll;
	border-radius: 14px;
	margin-bottom: 16px;
	padding-top: 16px;
	padding-bottom: 16px;
	height: 100%;
`

export const SenderContainer = styled(Box)`
	width: 100%;
`
