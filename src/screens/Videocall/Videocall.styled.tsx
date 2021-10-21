import { Grid, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

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

export const VideoWrapper = styled(Box)`
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
	}
`
