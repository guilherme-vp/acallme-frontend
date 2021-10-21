import React, { useState, useEffect } from 'react'

import {
	Box,
	Tabs,
	Stack,
	Typography,
	Select,
	MenuItem,
	SelectChangeEvent,
	FormControl,
	useMediaQuery
} from '@mui/material'
import { Theme } from '@mui/system'
import iziToast from 'izitoast'
import { FiVideo as VideoIcon, FiMic as MicIcon } from 'react-icons/fi'

import { useIntl } from 'hooks'
import { Modal } from 'parts/Modal'
import { capitalizeLetter } from 'utils/capitalize-letter'

import { StyledTab } from './ChangeDevicesModal.styled'

export interface DeviceType {
	type: 'audio' | 'video'
	sourceId: string
}

export interface ChangeDevicesModalProps {
	open: boolean
	onClose: () => void
	handleChangeDevice: (data: DeviceType) => void
}

export const ChangeDevicesModal = ({
	handleChangeDevice,
	onClose,
	open
}: ChangeDevicesModalProps) => {
	const intl = useIntl()
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	const [tab, setTab] = useState(0)
	const [video, setVideo] = useState<MediaDeviceInfo>()
	const [audio, setAudio] = useState<MediaDeviceInfo>()
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
	const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])

	const changeTab = (tabValue: number) => {
		setTab(tabValue)
	}

	useEffect(() => {
		;(async () => {
			const devices = await navigator.mediaDevices.enumerateDevices()

			const videos = devices.filter(({ kind }) => kind === 'videoinput')
			const audios = devices.filter(({ kind }) => kind === 'audioinput')

			setVideoDevices(videos)
			setAudioDevices(audios)
		})()
	}, [])

	const handleChangeVideo = (event: SelectChangeEvent) => {
		const { value } = event.target

		const chosen = videoDevices.find(({ deviceId }) => value === deviceId)

		if (!chosen) {
			return
		}

		setVideo(chosen)

		handleChangeDevice({ type: 'video', sourceId: value })

		iziToast.success({
			title: capitalizeLetter(intl.formatMessage({ id: 'success' })),
			message: intl.formatMessage({ id: 'notification.device.success' })
		})
	}

	const handleChangeAudio = (event: SelectChangeEvent) => {
		const { value } = event.target

		const chosen = audioDevices.find(({ deviceId }) => value === deviceId)

		setAudio(chosen)
		handleChangeDevice({ type: 'audio', sourceId: value })

		iziToast.success({
			title: capitalizeLetter(intl.formatMessage({ id: 'success' })),
			message: intl.formatMessage({ id: 'notification.device.success' })
		})
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={capitalizeLetter(intl.formatMessage({ id: 'config' }))}
			footer={false}
			showCloseButton
			maxWidth="xl"
			size="big"
		>
			<Box sx={isMdUp ? { flexGrow: 1, display: 'flex', height: 224 } : { height: '100%' }}>
				<Tabs
					orientation={isMdUp ? 'vertical' : 'horizontal'}
					variant="fullWidth"
					value={tab}
					onChange={(_, newValue) => changeTab(newValue)}
					TabIndicatorProps={{ hidden: true }}
					sx={isMdUp ? { borderRight: 1, borderColor: 'divider', paddingRight: 1 } : {}}
				>
					<StyledTab
						icon={<MicIcon />}
						label={capitalizeLetter(intl.formatMessage({ id: 'audio' }))}
					/>
					<StyledTab
						icon={<VideoIcon />}
						label={capitalizeLetter(intl.formatMessage({ id: 'video' }))}
					/>
				</Tabs>
				<Stack sx={{ paddingX: { md: 3 } }} direction="column">
					<Box sx={{ width: '100%' }}>
						{tab === 0 && (
							<>
								<Typography
									variant="body1"
									color="text.secondary"
									textAlign="center"
									sx={{ marginBottom: '24px' }}
								>
									{capitalizeLetter(intl.formatMessage({ id: 'settings.select.audio' }))}
								</Typography>
								<Typography variant="h5" color="primary" sx={{ marginBottom: '6px' }}>
									{capitalizeLetter(intl.formatMessage({ id: 'audio' }))}
								</Typography>
								<FormControl variant="standard" fullWidth>
									<Select fullWidth value={audio?.label} onChange={handleChangeAudio}>
										{audioDevices.map(device => (
											<MenuItem key={device.deviceId} value={device.deviceId}>
												{device.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</>
						)}

						{tab === 1 && (
							<>
								<Typography
									variant="body1"
									color="text.secondary"
									textAlign="center"
									sx={{ marginBottom: '24px' }}
								>
									{intl.formatMessage({ id: 'settings.select.video' })}
								</Typography>
								<Typography variant="h5" color="primary" sx={{ marginBottom: '6px' }}>
									{capitalizeLetter(intl.formatMessage({ id: 'video' }))}
								</Typography>
								<FormControl variant="standard" fullWidth>
									<Select fullWidth value={video?.label} onChange={handleChangeVideo}>
										{videoDevices.map(device => (
											<MenuItem key={device.deviceId} value={device.deviceId}>
												{device.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</>
						)}
					</Box>
				</Stack>
			</Box>
		</Modal>
	)
}

export default ChangeDevicesModal
