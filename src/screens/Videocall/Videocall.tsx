/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react'

import { Grid, useMediaQuery, Zoom } from '@mui/material'
import { Theme } from '@mui/system'
import { intervalToDuration } from 'date-fns'

import { CallSettings } from 'components/CallSettings'
import { ChangeDevicesModal } from 'components/ChangeDevicesModal'
import { CallContext } from 'contexts'
import { useStoreon } from 'hooks'
import { Chat } from 'parts/Chat'
import { Record } from 'parts/Record'
import { FormProps } from 'parts/Record/Record'
import { RolesEnum } from 'services/entities'
import { getInitials } from 'utils/get-initials'

import { VideoContainer, VideoWrapper, UserAvatar } from './Videocall.styled'

export const Videocall = () => {
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const { user: loggedUser, role } = useStoreon('user', 'role')

	const [openChat, setOpenChat] = useState(false)
	const [openRecord, setOpenRecord] = useState(false)
	const [openSettings, setOpenSettings] = useState(false)
	const { chat, sendMessage } = useContext(CallContext)
	const {
		status,
		userStatus,
		countUsers,
		myVideo,
		userVideo,
		user,
		callEnded,

		handleHangout,
		handleToggleAudio,
		handleToggleVideo,
		changeDevicesSource,
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
		handleCloseRecord()
		setOpenChat(true)
	}

	const handleCloseSettings = () => {
		setOpenSettings(false)
	}

	const handleOpenSettings = () => {
		setOpenSettings(true)
	}

	const handleCloseRecord = () => {
		setOpenRecord(false)
	}

	const handleOpenRecord = () => {
		handleCloseChat()
		setOpenRecord(true)
	}

	const handleRecordSubmit = (data: FormProps) => {
		console.log(data)
	}

	return (
		<Grid container sx={{ height: '100%' }} flexDirection="column">
			<Grid container item sx={{ height: '90%' }} justifyContent="space-between">
				<Grid
					container
					item
					sm={openChat ? 9 : 12}
					justifyContent="space-between"
					alignItems="center"
				>
					{(isMdUp || countUsers <= 1) && (
						<Zoom in={!!myVideo}>
							<VideoContainer container item xs={12} md={countUsers <= 1 ? 12 : true}>
								<VideoWrapper status={!!status.video}>
									<video muted playsInline ref={myVideo} autoPlay />
									<UserAvatar src={loggedUser?.avatarUrl} status={!!status.video}>
										{getInitials(loggedUser?.name as string)}
									</UserAvatar>
								</VideoWrapper>
							</VideoContainer>
						</Zoom>
					)}
					{countUsers > 1 && user && (
						<Zoom in={!!userVideo}>
							<VideoContainer container item xs={12} md={countUsers <= 1 ? 12 : true}>
								<VideoWrapper status={!!userStatus.video}>
									<video
										muted
										playsInline
										ref={userVideo}
										autoPlay
										style={{ display: status.video ? 'block' : 'none' }}
									/>
									<UserAvatar src={user?.avatarUrl} status={!!userStatus.video}>
										{getInitials(user?.name as string)}
									</UserAvatar>
								</VideoWrapper>
							</VideoContainer>
						</Zoom>
					)}
				</Grid>
				{openChat && (
					<Grid
						item
						sm={3}
						sx={{
							height: '100%',
							padding: '20px 8px 8px'
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
				{openRecord && (
					<Grid
						item
						sm={3}
						sx={{
							height: '100%',
							padding: '20px 8px 8px'
						}}
					>
						<Record
							open={openRecord}
							handleClose={handleCloseRecord}
							callEnded={callEnded}
							onSubmit={handleRecordSubmit}
						/>
					</Grid>
				)}
			</Grid>

			<Grid container item sx={{ height: '10%' }}>
				<CallSettings
					duration={duration}
					handleClose={handleHangout}
					handleToggleAudio={handleToggleAudio}
					handleToggleVideo={handleToggleVideo}
					openSettings={handleOpenSettings}
					openChat={handleOpenChat}
					openRecord={handleOpenRecord}
					isSpecialist={role === RolesEnum.Specialist}
					{...status}
				/>
			</Grid>
			<ChangeDevicesModal
				open={openSettings}
				handleChangeDevice={({ sourceId, type }) =>
					changeDevicesSource(
						type === 'audio' ? { audioId: sourceId } : { videoId: sourceId }
					)
				}
				onClose={handleCloseSettings}
			/>
		</Grid>
	)
}

export default Videocall
