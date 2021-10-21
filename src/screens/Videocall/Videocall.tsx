import React, { useState, useContext, useLayoutEffect, useEffect } from 'react'

import { Grid } from '@mui/material'
import { intervalToDuration } from 'date-fns'

import { CallSettings } from 'components/CallSettings'
import { ChangeDevicesModal } from 'components/ChangeDevicesModal'
import { CallContext } from 'contexts'
import { Chat } from 'parts/Chat'

import { VideoContainer, VideoWrapper } from './Videocall.styled'

export const Videocall = () => {
	const [openChat, setOpenChat] = useState(true)
	const [openSettings, setOpenSettings] = useState(false)
	const { chat, sendMessage } = useContext(CallContext)
	const {
		stream,
		status,
		myVideo,
		handleToggleAudio,
		handleToggleCamera,

		enterCall
	} = useContext(CallContext)
	const baseDate = new Date()

	const [duration, setDuration] = useState<string>('')

	useLayoutEffect(() => {
		enterCall()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setInterval(() => {
			const interval = intervalToDuration({
				start: baseDate,
				end: new Date()
			})

			const { hours, minutes, seconds } = interval

			const formatNumber = (n = 0): string =>
				n.toLocaleString('en-US', { minimumIntegerDigits: 2 })

			const final = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
				seconds
			)}`

			setDuration(final)
		}, 1000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleCloseChat = () => {
		setOpenChat(false)
	}

	const handleOpenChat = () => {
		setOpenChat(true)
	}

	const handleCloseSettings = () => {
		setOpenSettings(false)
	}

	const handleOpenSettings = () => {
		setOpenSettings(true)
	}

	return (
		<Grid container sx={{ height: '100%' }} flexDirection="column">
			<Grid container item sx={{ height: '90%' }} justifyContent="space-between">
				<Grid
					container
					item
					sm={openChat ? 9 : 12}
					justifyContent="center"
					alignItems="center"
				>
					{stream && myVideo && (
						<VideoContainer>
							<VideoWrapper>
								<video
									playsInline
									muted
									ref={myVideo}
									autoPlay
									className="video-active"
									style={{
										opacity: `${status.video ? '1' : '0'}`
									}}
								/>
							</VideoWrapper>
						</VideoContainer>
					)}
				</Grid>
				{openChat && (
					<Grid
						item
						sm={3}
						sx={{
							height: '100%',
							padding: '16px 8px 16px'
						}}
					>
						<Chat
							chat={chat}
							sendMessage={sendMessage}
							open={openChat}
							handleClose={handleCloseChat}
						/>
					</Grid>
				)}
			</Grid>

			<Grid container item sx={{ height: '10%' }}>
				<CallSettings
					duration={duration}
					handleClose={() => {}}
					handleToggleAudio={handleToggleAudio}
					handleToggleCamera={handleToggleCamera}
					openSettings={handleOpenSettings}
					openChat={handleOpenChat}
					openRecord={() => {}}
					isSpecialist
					{...status}
				/>
			</Grid>
			<ChangeDevicesModal
				open={openSettings}
				handleChangeDevice={() => {}}
				onClose={handleCloseSettings}
			/>
		</Grid>
	)
}

export default Videocall
