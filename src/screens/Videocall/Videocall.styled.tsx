import styled from 'styled-components'

import { Grid, Box, Avatar } from '@mui/material'

export const Container = styled(Grid)`
	padding: 16px;
	height: 100%;
`

export const VideoContainer = styled(Grid)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;

	@media only screen and (min-width: 768px) {
		padding: 20px 16px 8px;
	}
`

export const VideoWrapper = styled(Box).withConfig<{ status: boolean }>({
	shouldForwardProp: props => !['status'].includes(props)
})`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	video {
		height: 100%;
		width: 100%;
		object-fit: cover;
		position: absolute;
		transform: scaleX(-1);
		border-radius: 12px;
		display: ${({ status }) => (status ? 'block' : 'none')};
	}
`

export const UserAvatar = styled(Avatar).withConfig<{ status: boolean }>({
	shouldForwardProp: props => !['status'].includes(props)
})`
	width: 120px;
	height: 120px;
	opacity: ${({ status }) => (status ? 0 : 1)};
	background-color: ${({ theme }) => theme.background.darker};
`
