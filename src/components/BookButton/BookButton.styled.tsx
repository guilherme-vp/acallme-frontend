import styled from 'styled-components'

import { Button } from '@mui/material'

export const BookButton = styled(Button).withConfig<{
	isScheduled: boolean
	isConfirmed?: boolean
	isChosen?: boolean
}>({
	shouldForwardProp: props => !['isScheduled', 'isConfirmed', 'isChosen'].includes(props)
})`
	background-color: ${({ disabled, isScheduled, isConfirmed, isChosen, theme }) =>
		disabled
			? 'transparent'
			: isScheduled && !isConfirmed
			? theme.colors.alternative
			: isScheduled && isConfirmed
			? theme.colors.secondary
			: isChosen
			? theme.colors.primary
			: 'transparent'} !important;
	color: ${({ isScheduled, isChosen, theme }) =>
		!isScheduled && !isChosen ? theme.text.description : theme.tags.white};
	padding: 4px 20px;
	border-radius: 8px;
	font-weight: 600;
`
