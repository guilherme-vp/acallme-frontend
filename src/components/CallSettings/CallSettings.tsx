import React from 'react'

import { IconButton, Stack, Typography } from '@mui/material'
import {
	MdMic as MicOn,
	MdMicOff as MicOff,
	MdVideocam as VideoOn,
	MdVideocamOff as VideoOff,
	MdCallEnd as EndCall,
	MdFullscreen as FullScreen,
	MdFullscreenExit as ExitFullScreen
} from 'react-icons/md'

import * as S from './CallSettings.styled'

export interface CallSettingsProps {
	duration: string
	camera?: boolean
	handleToggleCamera: () => void
	audio?: boolean
	handleToggleAudio: () => void
	fullscreen?: boolean
	handleToggleFullscreen: () => void
	handleClose: () => void
}

export const CallSettings = ({
	duration,
	audio = true,
	camera = true,
	fullscreen = false,
	handleClose,
	handleToggleAudio,
	handleToggleCamera,
	handleToggleFullscreen
}: CallSettingsProps) => (
	<S.SettingsContainer>
		<Stack direction="row" spacing={3}>
			<IconButton onClick={() => handleToggleAudio()}>
				{audio ? <MicOn /> : <MicOff />}
			</IconButton>
			<IconButton onClick={() => handleToggleCamera()}>
				{camera ? <VideoOn /> : <VideoOff />}
			</IconButton>
			<IconButton onClick={() => handleClose()} color="error">
				<EndCall />
			</IconButton>
			<IconButton onClick={() => handleToggleFullscreen()}>
				{fullscreen ? <FullScreen /> : <ExitFullScreen />}
			</IconButton>
		</Stack>
		<div>
			<Typography textAlign="center" variant="body2">
				{duration}
			</Typography>
		</div>
	</S.SettingsContainer>
)

export default CallSettings
