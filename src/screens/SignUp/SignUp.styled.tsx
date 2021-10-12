import { Avatar, Box } from '@mui/material'
import styled from 'styled-components'

export const PhotoContainer = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	position: relative;

	.image-selector {
		font-size: 18px;
		position: absolute;
		padding: 4px;
		border-radius: 50%;
		background: ${props => props.theme.background.main};
		border: 1px solid ${props => props.theme.border.darker};
		bottom: 0;
		right: 90px;
		height: 24px;
		color: ${props => props.theme.colors.darker};
		cursor: pointer;
	}

	input {
		display: none;
	}
`

export const ImageSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 16px;
	border: 2px solid ${props => props.theme.border.darker};
	border-style: dashed;
`

export const ImageAvatar = styled(Avatar)`
	width: 150px !important;
	height: 150px !important;
	border: 1px solid ${props => props.theme.border.colored};
`

export const ChosenImage = styled.img`
	width: 100%;
	height: 100%;
	max-width: 200px;
`
