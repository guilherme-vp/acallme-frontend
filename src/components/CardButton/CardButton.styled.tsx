import { Button } from '@mui/material'
import styled from 'styled-components'

export const CardButton = styled(Button).withConfig<{
	selected?: boolean
	size?: 'small' | 'large'
}>({
	shouldForwardProp: props => !['selected', 'size'].includes(props)
})`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	border-radius: 8px;
	padding: ${props => (props.size === 'small' ? '30px 20px' : '40px 20px')}!important;
	height: 100%;
	color: ${props => props.theme.colors.alternative} !important;
	border: 1px solid
		${props => (props.selected ? props.theme.border.colored : props.theme.border.darker)} !important;

	img {
		width: 150px;
		margin-bottom: 16px;
	}

	@media only screen and (min-width: 768px) {
		height: ${props => (props.size === 'small' ? '200px' : '300px')};
	}
`
