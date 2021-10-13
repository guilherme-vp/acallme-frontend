import React from 'react'

import { Slide, useScrollTrigger } from '@mui/material'

export const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
	const trigger = useScrollTrigger()
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

export default HideOnScroll
