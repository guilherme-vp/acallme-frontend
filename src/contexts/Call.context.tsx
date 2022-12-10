/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useRef, createContext, RefObject } from 'react'

import iziToast from 'izitoast'
import { useNavigate, useParams } from 'react-router-dom'
import Peer from 'simple-peer'

import type { Message } from '../components/Message'
import { WsEvents } from '../constants/ws-events'
import { useIntl, useStoreon } from '../hooks'
import { callSocket as socket } from '../services/ws/client'
import { v4 as uuidv4 } from 'uuid'
import { HOME } from 'routes'

interface Caller {
	socketId: string
	name: string
	avatarUrl?: string
}

interface Status {
	fullscreen?: boolean
	video: boolean
	audio: boolean
}

export interface Authorization {
	videoId?: string
	audioId?: string
}

export interface CallContextProps {
	chat: Message[]
	socketId?: string
	status: Status
	user?: Caller
	userStatus: Status
	countUsers: number
	room: string
	myVideo: RefObject<HTMLVideoElement>
	userVideo: RefObject<HTMLVideoElement>

	sendMessage: (content: string) => void
	handleToggleVideo: () => void
	handleToggleAudio: () => void
	handleHangout: () => void
	changeDevicesSource: (sources: Authorization) => void
}

export const CallContext = createContext<CallContextProps>({
	chat: [],
	socketId: '',
	status: { audio: true, video: true },
	user: undefined,
	userStatus: { audio: true, video: true },
	countUsers: 0,
	room: '',
	myVideo: { current: null },
	userVideo: { current: null },

	handleHangout: () => {},
	handleToggleAudio: () => {},
	handleToggleVideo: () => {},
	sendMessage: () => {},
	changeDevicesSource: () => {}
})

export const CallProvider: React.FC = ({ children }) => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { scheduleId } = useParams<{ scheduleId: string }>()
	const [socketId, setSocketId] = useState<string>()
	const room = `room-${scheduleId}`

	const { user: me } = useStoreon('user')
	const [user, setUser] = useState<Caller>()
	const [countUsers, setCountUsers] = useState(0)

	const [stream, setStream] = useState<MediaStream>()

	const [status, setStatus] = useState<Status>({
		audio: true,
		video: true,
		fullscreen: false
	})
	const [userStatus, setUserStatus] = useState<Omit<Status, 'fullscreen'>>({
		audio: true,
		video: true
	})
	const myVideo = useRef<HTMLVideoElement>(null)
	const userVideo = useRef<HTMLVideoElement>(null)
	const [userPeer, setUserPeer] = useState<Peer.Instance>()
	const userPeerRef = useRef<{ peer: Peer.Instance }>({
		peer: {} as Peer.Instance
	})

	const [chat, setChat] = useState<Message[]>([])

	const requestAuthorization = async ({ videoId, audioId }: Authorization = {}) => {
		const mediaStream = await navigator.mediaDevices.getUserMedia({
			video: {
				deviceId: { ideal: videoId },
				facingMode: 'user'
			},
			audio: {
				deviceId: { ideal: audioId }
			}
		})

		if (myVideo.current) {
			myVideo.current.srcObject = mediaStream
		}

		if (!stream) {
			setStream(mediaStream)
		}

		return mediaStream
	}

	useEffect(() => {
		setSocketId(socket.id)

		async function init() {
			try {
				const myStream = await requestAuthorization()

				socket.emit(WsEvents.JOIN_CALL, room)
				setCountUsers(prev => prev + 1)

				socket.on(
					WsEvents.RECEIVE_USER,
					(payload: {
						socketId: string
						name: string
						avatarUrl?: string
						roomId: string
					}) => {
						const { name, socketId, avatarUrl } = payload

						if (userPeer != null || !socketId) {
							return
						}

						console.log('[P2P] Creating peer for user')
						const peer = createPeer(socketId, myStream)

						setUserPeer(peer)
						setUser({ name, socketId, avatarUrl })
						setCountUsers(prev => prev + 1)
						userPeerRef.current.peer = peer
					}
				)

				socket.on(
					WsEvents.USER_JOINED,
					(payload: {
						signal: Peer.SignalData
						socketId: string
						name: string
						avatarUrl?: string
					}) => {
						const { name, signal, socketId, avatarUrl } = payload

						if (userPeer != null) return

						const peer = addPeer(signal, socketId, myStream)

						setUserPeer(peer)
						setUser({ name, socketId, avatarUrl })
						setCountUsers(prev => prev + 1)
						userPeerRef.current.peer = peer
					}
				)

				socket.on(
					WsEvents.RECEIVE_SIGNAL,
					(payload: { signal: Peer.SignalData; id: string }) => {
						const { signal } = payload
						console.log('[P2P] Signaling peer')
						userPeerRef.current.peer.signal(signal)
					}
				)

				socket.on(
					WsEvents.UPDATE_USER_MEDIA,
					(data: { type: 'audio' | 'video' | 'both'; statuses: boolean[] }) => {
						const { statuses, type } = data

						switch (type) {
							case 'video':
								setUserStatus(prevStatus => ({ ...prevStatus, video: statuses[0] }))
								break
							case 'audio':
								setUserStatus(prevStatus => ({ ...prevStatus, audio: statuses[0] }))
								break
							default:
								setUserStatus(prevStatus => ({
									...prevStatus,
									video: statuses[0],
									audio: statuses[1]
								}))
								break
						}
					}
				)

				socket.once(WsEvents.END_CALL, () => {
					handleHangout()
				})

				socket.on(WsEvents.LEAVE_CALL, () => {
					handleUserDisconnection()
				})
			} catch (e) {
				console.log('Erro na requisição de autorização', e)
			}
		}

		init()
	}, [])

	// Messages
	useEffect(() => {
		socket.on(
			WsEvents.RECEIVE_MESSAGE,
			(data: { id: string; messageId: string; createdAt: string; message: string }) => {
				const { id, messageId, message, createdAt } = data

				if (id === socketId) return

				addMessage({ id: messageId, message, createdAt, isSpeaker: false })
			}
		)
	}, [])

	// Notifications
	useEffect(() => {
		socket.on(WsEvents.SEND_CLOSE_NOTIFICATION, () => {
			iziToast.warning({
				title: intl.formatMessage({ id: 'call.close.warn.title' }),
				message: intl.formatMessage({ id: 'call.close.warn.desc' })
			})
		})
	}, [])

	if (!me) {
		navigate(HOME)
		return null
	}

	const createPeer = (userToSignal: string, stream: MediaStream) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			offerOptions: {
				offerToReceiveAudio: true,
				offerToReceiveVideo: true
			},
			stream
		})

		peer.on('signal', signal => {
			console.log(`[P2P] Sending signal to ${userToSignal}`)
			socket.emit(WsEvents.SEND_SIGNAL, {
				userToSignal,
				signal
			})
		})

		peer.on('stream', stream => {
			console.log(`[P2P] setting stream of ${userToSignal}`)

			let newStatus = userStatus
			stream.getTracks().forEach(track => {
				newStatus = { ...newStatus, [track.kind]: track.enabled }
			})

			userVideo.current!.srcObject = stream
			setUserStatus(newStatus)
		})

		peer.on('error', error => console.log(`[P2P] ${error}`))

		peer.on('connect', () => console.log(`[P2P] Peer connected with ${userToSignal}`))

		peer.on('close', () => console.log(`[P2P] Channel closed with ${userToSignal}`))

		return peer
	}

	const handleUserDisconnection = () => {
		console.log(`[P2P] Disconnecting user`)
		iziToast.info({
			title: intl.formatMessage({ id: 'call.userLeft.title' }),
			message: intl.formatMessage({ id: 'call.userLeft.desc' }),
			position: 'topCenter',
			timeout: 3000
		})
		setCountUsers(prev => prev - 1)
		setUser(undefined)
		userPeer?.destroy()
	}

	const addPeer = (
		incomingSignal: Peer.SignalData,
		userId: string,
		stream?: MediaStream
	) => {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream,
			answerOptions: {
				offerToReceiveAudio: false,
				offerToReceiveVideo: false
			}
		})

		peer.on('signal', signal => {
			console.log(`[P2P] Signal received from ${userId}`)
			socket.emit(WsEvents.RETURN_SIGNAL, { signal, userId })
		})

		peer.signal(incomingSignal)

		peer.on('error', error => {
			console.log(`[P2P] ${error}`)
		})

		peer.on('connect', () => console.log(`[P2P] Peer connected with ${userId}`))

		peer.on('close', () => console.log(`[P2P] Channel closed with ${userId}`))

		peer.on('stream', userStream => {
			console.log(`[P2P] Getting stream of ${userId}`)
			let newStatus = userStatus
			userStream.getTracks().forEach(track => {
				newStatus = { ...newStatus, [track.kind]: track.enabled }
			})

			userVideo.current!.srcObject = userStream
			setUserStatus(newStatus)
		})

		return peer
	}

	// Util Function to add a message to Chat
	const addMessage = (content: {
		id: string
		message: string
		createdAt?: string
		isSpeaker: boolean
	}) => {
		const { id, message, createdAt, isSpeaker } = content

		setChat(prev => [
			...prev,
			{
				id,
				createdAt: createdAt != null ? new Date(createdAt) : new Date(),
				message,
				isSpeaker,
				name: !isSpeaker && user != null ? user.name : me.name,
				avatarUrl: !isSpeaker && user != null ? user.avatarUrl : me.avatarUrl
			}
		])
	}

	const sendMessage = (content: string) => {
		const messageId = uuidv4()

		addMessage({
			id: messageId,
			isSpeaker: true,
			message: content
		})

		socket.emit(WsEvents.SEND_MESSAGE, {
			id: messageId,
			message: content,
			createdAt: new Date()
		})
	}

	const handleToggleVideo = async () => {
		if (!stream) return

		const currentVideoTrack = stream.getVideoTracks()[0]
		if (currentVideoTrack.enabled) {
			currentVideoTrack.stop()
			currentVideoTrack.enabled = false
		} else {
			await changeDevicesSource({ videoId: currentVideoTrack.id })
		}

		setStatus(prev => {
			const { video } = prev

			console.log('Emitted update media video')
			socket.emit(WsEvents.UPDATE_MEDIA, {
				type: 'video',
				currentMediaStatuses: [!video],
				room
			})

			return { ...prev, video: !video }
		})
	}

	const handleToggleAudio = async () => {
		if (!stream) return

		const currentAudioTrack = stream.getAudioTracks()[0]
		if (currentAudioTrack.enabled) {
			currentAudioTrack.stop()
			currentAudioTrack.enabled = false
		} else {
			await changeDevicesSource({ audioId: currentAudioTrack.id })
		}

		setStatus(prev => {
			const { audio } = prev

			console.log('Emitted update media audio')
			socket.emit(WsEvents.UPDATE_MEDIA, {
				type: 'audio',
				currentMediaStatuses: [!audio],
				room
			})

			return { ...prev, audio: !audio }
		})
	}

	const handleHangout = () => {
		socket.emit(WsEvents.LEAVE_CALL)

		userVideo.current?.remove()
		myVideo.current?.remove()
		userPeer?.destroy()
		socket.disconnect()

		navigate(HOME)
	}

	const changeDevicesSource = async ({ audioId, videoId }: Authorization) => {
		const oldTracks = stream?.getTracks()

		const newStream = await requestAuthorization({ audioId, videoId })

		if (oldTracks == null || stream == null || userPeer == null) return

		const newTracks = newStream.getTracks()

		oldTracks.forEach(oldTrack => {
			newTracks.forEach(newTrack => {
				if (oldTrack.kind === newTrack.kind) {
					// userPeer?.replaceTrack(oldTrack, newTrack, stream)
					userPeerRef.current.peer.replaceTrack(oldTrack, newTrack, stream)
				}
			})
		})
	}

	return (
		<CallContext.Provider
			value={{
				chat,
				socketId,
				status,
				user,
				userStatus,
				room,
				myVideo,
				userVideo,
				countUsers,

				changeDevicesSource,
				sendMessage,
				handleToggleVideo,
				handleToggleAudio,
				handleHangout
			}}
		>
			{children}
		</CallContext.Provider>
	)
}
