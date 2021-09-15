import styled from 'styled-components'
import { alpha } from '@material-ui/core/styles'

export const ListGlow = styled.ul`
	list-style: none;

	li {
		margin-bottom: 20px;
		&::before {
			content: '';
			display: inline-block;
			width: 7px;
			height: 7px;
			border-radius: 50%;
			background-color: ${props => props.theme.colors.primary};
			margin-right: 20px;
			margin-bottom: 1px;
			box-shadow: 0 0 5px 3px ${props => alpha(props.theme.colors.secondary, 0.2)};
		}
	}
`
