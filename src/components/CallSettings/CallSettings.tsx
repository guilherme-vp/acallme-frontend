import React from 'react'

import { Stack, Typography } from '@mui/material'
import {
	MdMic as MicOn,
	MdMicOff as MicOff,
	MdVideocam as VideoOn,
	MdVideocamOff as VideoOff,
	MdCallEnd as EndCall,
	MdMoreVert as SettingsIcon
} from 'react-icons/md'

import * as S from './CallSettings.styled'

export interface CallSettingsProps {
	duration: string
	camera?: boolean
	handleToggleCamera: () => void
	audio?: boolean
	handleToggleAudio: () => void
	handleClose: () => void
	openSettings: () => void
}

export const CallSettings = ({
	duration,
	audio = true,
	camera = true,
	handleClose,
	handleToggleAudio,
	handleToggleCamera,
	openSettings
}: CallSettingsProps) => (
	<S.SettingsContainer>
		<Typography textAlign="center" color="white" variant="body1">
			{duration}
		</Typography>
		<Stack direction="row" spacing={3}>
			<S.OptionButton disableRipple isOff={!audio} onClick={() => handleToggleAudio()}>
				{audio ? <MicOn /> : <MicOff />}
			</S.OptionButton>
			<S.OptionButton disableRipple isOff={!camera} onClick={() => handleToggleCamera()}>
				{camera ? <VideoOn /> : <VideoOff />}
			</S.OptionButton>
			<S.OptionButton disableRipple onClick={openSettings}>
				<SettingsIcon />
			</S.OptionButton>
			<S.OptionButton disableRipple onClick={() => handleClose()} isHangout>
				<EndCall />
			</S.OptionButton>
		</Stack>
		<div />
	</S.SettingsContainer>
)

export default CallSettings
