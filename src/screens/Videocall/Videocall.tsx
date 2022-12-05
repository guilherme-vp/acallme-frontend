/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useContext, useEffect, useRef } from 'react'

import { Grid, useMediaQuery, Zoom } from '@mui/material'
import { Theme } from '@mui/system'
import { intervalToDuration } from 'date-fns'

import { CallSettings } from 'components/CallSettings'
import { ChangeDevicesModal } from 'components/ChangeDevicesModal'
import { CallContext } from 'contexts'
import { useIntl, useStoreon } from 'hooks'
import { Chat } from 'parts/Chat'
import { Record } from 'parts/Record'
import { FormProps } from 'parts/Record/Record'
import { RolesEnum } from 'services/entities'
import { getInitials } from 'utils/get-initials'
import { HOME } from 'routes'

import { VideoContainer, VideoWrapper, UserAvatar } from './Videocall.styled'
import iziToast from 'izitoast'
import { useNavigate } from 'react-router-dom'
import usePrevious from 'hooks/usePrevious'

export const Videocall = () => {
	const intl = useIntl()
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const navigate = useNavigate()
	const { user: loggedUser, role } = useStoreon('user', 'role')

	const [openChat, setOpenChat] = useState(false)
	const [openRecord, setOpenRecord] = useState(false)
	const [openSettings, setOpenSettings] = useState(false)
	const {
		chat,
		sendMessage,

		status,
		userStatus,
		countUsers,
		myVideo,
		userVideo,
		user,
		callEnded,

		changeDevicesSource
	} = useContext(CallContext)
	const prevMessages = usePrevious(chat)
	const startDate = useRef(new Date())

	const [duration, setDuration] = useState<string>('')
	const [hasNewMessages, setHasNewMessages] = useState(false)

	useEffect(() => {
		setInterval(() => {
			const interval = intervalToDuration({
				start: startDate.current,
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
	}, [])

	useEffect(() => {
		if (callEnded) {
			iziToast.info({
				title: intl.formatMessage({ id: 'call.close.title' }),
				message: intl.formatMessage({ id: 'call.close.desc' })
			})
			setTimeout(() => {
				navigate(HOME)
			}, 3000)
		}
	}, [callEnded])

	useEffect(() => {
		if (!openChat && prevMessages && prevMessages.length !== chat.length) {
			setHasNewMessages(true)
		}

		if (openChat) {
			setHasNewMessages(false)
		}
	}, [prevMessages, chat, openChat])

	const handleToggleChat = (open?: boolean) => {
		if (openRecord) {
			setOpenRecord(false)
		}
		setOpenChat(prev => open ?? !prev)
	}

	const handleCloseSettings = () => {
		setOpenSettings(false)
	}

	const handleOpenSettings = () => {
		setOpenSettings(true)
	}

	const handleToggleRecord = (open?: boolean) => {
		if (openChat) {
			setOpenChat(false)
		}
		setOpenRecord(prev => open ?? !prev)
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
					sm={openRecord || openChat ? 9 : 12}
					justifyContent="space-between"
					alignItems="center"
				>
					{isMdUp || countUsers === 1 ? (
						<Zoom in={myVideo.current != null}>
							<VideoContainer container item xs={12} md={countUsers <= 1 ? 12 : true}>
								<VideoWrapper status={status.video}>
									<video muted playsInline ref={myVideo} autoPlay />
									<UserAvatar src={loggedUser?.avatarUrl} status={status.video}>
										{getInitials(loggedUser?.name as string)}
									</UserAvatar>
								</VideoWrapper>
							</VideoContainer>
						</Zoom>
					) : null}
					{user ? (
						<Zoom in={userVideo.current != null}>
							<VideoContainer container item xs={12} md={countUsers <= 1 ? 12 : true}>
								<VideoWrapper status={userStatus.video}>
									<video playsInline ref={userVideo} autoPlay />
									<UserAvatar src={user.avatarUrl} status={userStatus.video}>
										{getInitials(user.name)}
									</UserAvatar>
								</VideoWrapper>
							</VideoContainer>
						</Zoom>
					) : null}
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
							handleClose={() => handleToggleChat(false)}
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
							handleClose={() => handleToggleRecord(false)}
							callEnded={callEnded}
							onSubmit={handleRecordSubmit}
						/>
					</Grid>
				)}
			</Grid>

			<Grid container item sx={{ height: '10%' }}>
				<CallSettings
					duration={duration}
					openSettings={handleOpenSettings}
					toggleChat={handleToggleChat}
					toggleRecord={handleToggleRecord}
					isSpecialist={role === RolesEnum.Specialist}
					hasNewMessages={hasNewMessages}
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
