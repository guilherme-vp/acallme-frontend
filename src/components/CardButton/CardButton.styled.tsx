import { Button } from '@mui/material'
import styled from 'styled-components'

export const CardButton = styled(Button).withConfig<{ selected?: boolean }>({
	shouldForwardProp: props => !['selected'].includes(props)
})`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border-radius: 8px;
	padding: 40px !important;
	height: 300px;
	color: ${props => props.theme.colors.alternative} !important;
	border: 1px solid
		${props => (props.selected ? props.theme.border.colored : props.theme.border.thin)} !important;

	img {
		width: 100%;
		margin-bottom: 16px;
	}
`
