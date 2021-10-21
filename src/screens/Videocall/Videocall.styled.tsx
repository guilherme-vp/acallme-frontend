import { Grid, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Grid)`
	padding: 16px;
	height: 100%;
`

export const VideoContainer = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 16px;
	width: 100%;
	height: 100%;
`

export const VideoWrapper = styled(Box)`
	width: 100%;
	height: 100%;
	position: relative;

	video {
		height: 100%;
		width: 100%;
		object-fit: cover;
		position: absolute;
		transform: scaleX(-1);
	}
`
