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

export const TBody = styled.tbody`
	&::before {
		line-height: 16px;
		content: ' ';
		display: block;
	}
`

export const BookButton = styled(Button).withConfig<{ isScheduled: boolean }>({
	shouldForwardProp: props => !['isScheduled'].includes(props)
})`
	background-color: ${({ disabled, isScheduled, theme }) =>
		disabled || !isScheduled ? 'transparent' : theme.colors.secondary} !important;
	color: ${({ isScheduled, theme }) =>
		!isScheduled ? theme.text.description : theme.tags.white};
	padding: 8px 30px;
	border-radius: 8px;
	font-weight: 600;
`
