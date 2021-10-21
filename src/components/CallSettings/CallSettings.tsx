import React from 'react'

import { Stack, Typography, useMediaQuery } from '@mui/material'
import { Theme } from '@mui/system'
import {
	MdMic as MicOn,
	MdMicOff as MicOff,
	MdVideocam as VideoOn,
	MdVideocamOff as VideoOff,
	MdCallEnd as EndCall,
	MdMoreVert as SettingsIcon,
	MdChatBubbleOutline as ChatIcon,
	MdOutlineDescription as DocumentIcon
} from 'react-icons/md'

import * as S from './CallSettings.styled'

export interface CallSettingsProps {
	duration: string
	camera?: boolean
	audio?: boolean
	isSpecialist: boolean
	handleToggleCamera: () => void
	handleToggleAudio: () => void
	handleClose: () => void
	openSettings: () => void
	openChat: () => void
	openRecord: () => void
}

export const CallSettings = ({
	duration,
	audio = true,
	camera = true,
	handleClose,
	handleToggleAudio,
	handleToggleCamera,
	openSettings,
	openChat,
	isSpecialist,
	openRecord
}: CallSettingsProps) => {
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	return (
		<S.SettingsContainer>
			{isMdUp && (
				<Typography textAlign="center" color="white" variant="body1">
					{duration}
				</Typography>
			)}
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
			{isMdUp && (
				<Stack direction="row" spacing={3}>
					<S.OptionButton onClick={openChat}>
						<ChatIcon />
					</S.OptionButton>
					{isSpecialist && (
						<S.OptionButton onClick={openRecord}>
							<DocumentIcon />
						</S.OptionButton>
					)}
				</Stack>
			)}
		</S.SettingsContainer>
	)
}

export default CallSettings
