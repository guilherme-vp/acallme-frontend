import React, { useContext, useEffect, useState } from 'react'

import { Badge, Stack, Typography, useMediaQuery } from '@mui/material'
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
import { CallContext } from 'contexts'

export interface CallSettingsProps {
	duration: string
	video?: boolean
	audio?: boolean
	hasNewMessages?: boolean
	isSpecialist: boolean
	openSettings: () => void
	toggleChat: (open?: boolean) => void
	toggleRecord: (open?: boolean) => void
}

export const CallSettings = ({
	duration,
	audio = true,
	video = true,
	hasNewMessages = false,
	openSettings,
	toggleChat,
	toggleRecord,
	isSpecialist
}: CallSettingsProps) => {
	const { handleHangout, handleToggleAudio, handleToggleVideo } = useContext(CallContext)

	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	return (
		<S.SettingsContainer>
			{isMdUp && (
				<Typography textAlign="center" color="white" variant="body1">
					{duration}
				</Typography>
			)}
			<Stack
				direction="row"
				spacing={3}
				justifyContent="center"
				sx={!isMdUp ? { width: '100%' } : {}}
			>
				<S.OptionButton disableRipple isOff={!audio} onClick={() => handleToggleAudio()}>
					{audio ? <MicOn /> : <MicOff />}
				</S.OptionButton>
				<S.OptionButton disableRipple isOff={!video} onClick={() => handleToggleVideo()}>
					{video ? <VideoOn /> : <VideoOff />}
				</S.OptionButton>
				<S.OptionButton disableRipple onClick={openSettings}>
					<SettingsIcon />
				</S.OptionButton>
				<S.OptionButton disableRipple onClick={() => handleHangout()} isHangout>
					<EndCall />
				</S.OptionButton>
			</Stack>
			{isMdUp && (
				<Stack direction="row" spacing={3}>
					<S.OptionButton onClick={() => toggleChat()}>
						<Badge color="secondary" variant="dot" invisible={!hasNewMessages}>
							<ChatIcon />
						</Badge>
					</S.OptionButton>
					{isSpecialist && (
						<S.OptionButton onClick={() => toggleRecord()}>
							<DocumentIcon />
						</S.OptionButton>
					)}
				</Stack>
			)}
			{!isMdUp && (
				<>
					<S.FabButton sx={{ top: '16px' }} onClick={() => toggleChat()}>
						<Badge
							color="secondary"
							variant="standard"
							sx={{ height: '24px', width: '24px' }}
							invisible={!hasNewMessages}
						>
							<ChatIcon />
						</Badge>
					</S.FabButton>
					<S.FabButton sx={{ top: 'calc(56px + 24px)' }} onClick={() => toggleRecord()}>
						<DocumentIcon />
					</S.FabButton>
				</>
			)}
		</S.SettingsContainer>
	)
}

export default CallSettings
