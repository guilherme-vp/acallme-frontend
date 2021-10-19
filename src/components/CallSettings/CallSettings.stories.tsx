import React, { useState, useEffect } from 'react'

import { Story, Meta } from '@storybook/react/types-6-0'
import { intervalToDuration } from 'date-fns'

import { CallSettings, CallSettingsProps } from './CallSettings'

export default {
	title: 'CallSettings',
	component: CallSettings
} as Meta

type StoryArgs = Partial<CallSettingsProps>

const Template: Story<CallSettingsProps> = args => {
	const baseDate = new Date()

	const [duration, setDuration] = useState<string>()
	const [audio, setAudio] = useState(true)
	const [camera, setCamera] = useState(true)
	const [fullScreen, setFullscreen] = useState(false)

	useEffect(() => {
		setInterval(() => {
			const interval = intervalToDuration({
				start: baseDate,
				end: new Date()
			})

			const { hours, minutes, seconds } = interval

			const formatNumber = (n: number): string =>
				n.toLocaleString('en-US', { minimumIntegerDigits: 2 })

			const final = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
				seconds
			)}`

			setDuration(final)
		}, 1000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<CallSettings
			duration={duration}
			audio={audio}
			camera={camera}
			fullscreen={fullScreen}
			handleToggleAudio={prev => setAudio(!prev)}
			handleToggleCamera={prev => setCamera(!prev)}
			handleToggleFullscreen={prev => setFullscreen(!prev)}
			{...args}
		/>
	)
}

export const basic = Template.bind({})

basic.args = {
	handleClose: () => console.log('Close call')
} as StoryArgs
