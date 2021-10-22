import styled from 'styled-components'

import { Button } from '@mui/material'

export const BookButton = styled(Button).withConfig<{
	isScheduled: boolean
	isConfirmed?: boolean
}>({
	shouldForwardProp: props => !['isScheduled', 'isConfirmed'].includes(props)
})`
	background-color: ${({ disabled, isScheduled, isConfirmed, theme }) =>
		disabled
			? 'transparent'
			: isScheduled && !isConfirmed
			? theme.colors.alternative
			: isScheduled && isConfirmed
			? theme.colors.secondary
			: 'transparent'} !important;
	color: ${({ isScheduled, theme }) =>
		!isScheduled ? theme.text.description : theme.tags.white};
	padding: 8px 30px;
	border-radius: 8px;
	font-weight: 600;
`
