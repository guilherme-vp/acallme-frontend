import { Slide, useScrollTrigger } from '@mui/material'
import React from 'react'

export const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
	const trigger = useScrollTrigger()
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

export default HideOnScroll
