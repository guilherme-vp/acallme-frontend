import { Grid } from '@mui/material'
import styled from 'styled-components'

export const Image = styled.img`
	width: 100%;
`

export const BorderedGrid = styled(Grid)`
	border: 1px solid ${props => props.theme.border.darker};
	border-radius: 16px;
	padding: 40px 20px;
`
