/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useRef, createContext, RefObject } from 'react'

import iziToast from 'izitoast'
import { useParams } from 'react-router'
import Peer from 'simple-peer'

import { MessageProps } from '../components/Message'
import { WsEvents } from '../constants/ws-events'
import { useIntl } from '../hooks'
import { callSocket as socket } from '../services/ws/client'

interface Caller {
	socketId: string
	signal: Peer.SignalData
	name: string
	avatarUrl?: string
}

interface Status {
	fullscreen?: boolean
	video?: boolean
	audio?: boolean
}

export interface Authorization {
	videoId?: string
	audioId?: string
}

export interface CallContextProps {
	stream?: MediaStream
	chat: MessageProps[]
	me?: string
	status: Status
	user?: Caller
	userStatus: Status
	countUsers: number
	callEnded: boolean
	room: string
	myVideo: RefObject<HTMLVideoElement>
	userVideo: RefObject<HTMLVideoElement>

	enterCall: () => void
	sendMessage: (content: string) => void
	handleToggleVideo: () => void
	handleToggleAudio: () => void
	handleEnterFullscreen: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => void
	handleLeaveFullscreen: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => void
	handleHangout: () => void
	changeDevicesSource: (sources: Authorization) => void
}

// @ts-ignore
export const CallContext = createContext<CallContextProps>()

export const CallProvider: React.FC = ({ children }) => {
	const intl = useIntl()
	const { scheduleId } = useParams<{ scheduleId: string }>()
	const room = `room-${scheduleId}`

	const [stream, setStream] = useState<MediaStream>()
	const [chat, setChat] = useState<MessageProps[]>([])
	const [me, setMe] = useState<string>()
	const [user, setUser] = useState<Caller>()
	const [countUsers, setCountUsers] = useState(1)
	const [callEnded, setCallEnded] = useState(false)

	const [status, setStatus] = useState<Status>({
		audio: true,
		video: true,
		fullscreen: false
	})
	const [userStatus, setUserStatus] = useState<Omit<Status, 'fullscreen'>>({
		audio: false,
		video: false
	})

	const myVideo = useRef<HTMLVideoElement>(null)
	const userVideo = useRef<HTMLVideoElement>(null)
	const connectionRef = useRef<Peer.Instance>()

	const requestAuthorization = async ({ videoId, audioId }: Authorization = {}) => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: { ideal: videoId },
					facingMode: 'user'
				},
				audio: {
					deviceId: { ideal: audioId }
				}
			})

			setStream(mediaStream)

			myVideo.current!.srcObject = mediaStream
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		;(async () => {
			await requestAuthorization()

			// Get User Socket Id From Server
			socket.on(WsEvents.ME, (socketId: string) => setMe(socketId))

			// Send Appointment Close Notification
			socket.on(WsEvents.SEND_CLOSE_NOTIFICATION, () => {
				iziToast.warning({
					title: intl.formatMessage({ id: 'call.close.warn.title' }),
					message: intl.formatMessage({ id: 'call.close.warn.desc' })
				})
			})

			// Close Call
			socket.on(WsEvents.END_CALL, () => {
				setCallEnded(true)
				connectionRef.current!.destroy()
			})

			// Update User Media Event Listener
			socket.on(
				WsEvents.UPDATE_USER_MEDIA,
				(data: {
					socketId: string
					type: 'audio' | 'video' | 'both'
					statuses: boolean[]
				}) => {
					const { statuses, socketId, type } = data

					if (socketId === me) {
						return
					}

					switch (type) {
						case 'video':
							setUserStatus({ ...userStatus, video: statuses[0] })
							break
						case 'audio':
							setUserStatus({ ...userStatus, audio: statuses[0] })
							break
						default:
							setUserStatus({ ...userStatus, video: statuses[0], audio: statuses[1] })
							break
					}
				}
			)

			// Receive Message Event Listener
			// socket.on(
			// 	WsEvents.RECEIVE_MESSAGE,
			// 	(data: {
			// 		id: string
			// 		name: string
			// 		avatarUrl?: string
			// 		createdAt: Date
			// 		message: string
			// 	}) => {
			// 		if (data.id === me) {
			// 			return
			// 		}

			// 		addMessage({ ...data, isSpeaker: false })
			// 	}
			// )
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Enter Call Function
	const enterCall = () => {
		const initiator = countUsers === 0

		const peer = new Peer({ initiator, stream })

		peer.on('signal', signal => {
			socket.emit(WsEvents.ENTER_CALL, {
				signal,
				room,
				mediaStatus: status
			} as { signal: Peer.SignalData; room: string; mediaStatus: Status })
		})

		peer.on('stream', currentStream => {
			userVideo.current!.srcObject = currentStream
		})

		socket.on(
			WsEvents.RECEIVE_USER,
			(data: Caller & { mediaStatus: Omit<Status, 'fullscreen'> }) => {
				const { mediaStatus, socketId, ...restUser } = data

				if (socketId === me) {
					return
				}

				setUser({ socketId, ...restUser })
				setUserStatus(mediaStatus)
				setCountUsers(prev => prev + 1)
				peer.signal(data.signal)
			}
		)

		connectionRef.current = peer
	}

	// Util Function to add a message to Chat
	const addMessage = (content: Omit<MessageProps, 'createdAt' | 'id'>) => {
		const newMessage = {
			createdAt: new Date(),
			...content
		}

		setChat(prev => [...prev, newMessage])
	}

	// Send Message as Speaker
	const sendMessage = (content: string) => {
		addMessage({
			...user,
			name: user?.name as string,
			isSpeaker: true,
			message: content
		})
	}

	// Toggle Video
	const handleToggleVideo = () => {
		setStatus(prev => {
			const { video } = prev

			socket.emit(WsEvents.UPDATE_MEDIA, {
				type: 'video',
				currentMediaStatus: !video,
				room
			})

			stream!.getVideoTracks()[0].enabled = !video

			return { ...prev, video: !video }
		})
	}

	// Toggle Audio
	const handleToggleAudio = () => {
		setStatus(prev => {
			const { audio } = prev

			socket.emit(WsEvents.UPDATE_MEDIA, {
				type: 'audio',
				currentMediaStatus: !audio,
				room
			})

			stream!.getAudioTracks()[0].enabled = !audio

			return { ...prev, audio: !audio }
		})
	}

	// Enter Fullscreen
	const handleEnterFullscreen = (e: any) => {
		const elem = e.target

		if (elem.requestFullscreen) {
			elem.requestFullscreen()
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen()
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen()
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen()
		}

		setStatus({ ...status, fullscreen: true })
	}
	// Leave Fullscreen
	const handleLeaveFullscreen = (e: any) => {
		const elem = e.target

		if (elem.requestFullscreen) {
			elem.requestFullscreen()
		} else if (elem.mozExitFullscreen) {
			/* Firefox */
			elem.mozExitFullscreen()
		} else if (elem.webkitExitFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitExitFullscreen()
		} else if (elem.msExitFullscreen) {
			/* IE/Edge */
			elem.msExitFullscreen()
		}

		setStatus({ ...status, fullscreen: false })
	}

	// End Call
	const handleHangout = () => {
		setCallEnded(true)

		connectionRef.current!.destroy()
		socket.emit(WsEvents.END_CALL, { id: me })
	}

	const changeDevicesSource = async ({ audioId, videoId }: Authorization) => {
		await requestAuthorization({ audioId, videoId })
	}

	return (
		<CallContext.Provider
			value={{
				stream,
				chat,
				me,
				status,
				user,
				userStatus,
				countUsers,
				callEnded,
				room,
				myVideo,
				userVideo,

				changeDevicesSource,
				enterCall,
				sendMessage,
				handleToggleVideo,
				handleToggleAudio,
				handleEnterFullscreen,
				handleLeaveFullscreen,
				handleHangout
			}}
		>
			{children}
		</CallContext.Provider>
	)
}
