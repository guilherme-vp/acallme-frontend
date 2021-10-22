import styled from 'styled-components'

import { Button } from '@mui/material'

export const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`

export const Table = styled.table`
	border-spacing: 16px;
	border-collapse: separate;
	width: 100%;
`

export const TData = styled.td`
	text-align: center;
`

export const TBody = styled.tbody`
	&::before {
		line-height: 16px;
		content: ' ';
		display: block;
	}
`

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
			: theme.colors.secondary} !important;
	color: ${({ isScheduled, theme }) =>
		!isScheduled ? theme.text.description : theme.tags.white};
	padding: 8px 30px;
	border-radius: 8px;
	font-weight: 600;
`
