import React from 'react'

import { Fab, useScrollTrigger, Zoom } from '@mui/material'
import { MdKeyboardArrowUp as ArrowIcon } from 'react-icons/md'

import { BottomContainer } from './ScrollToTop.styled'

interface ScrollProps {
	anchorId: string
}

export const ScrollToTop = ({ anchorId }: ScrollProps) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	})

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchorTarget = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector(`#${anchorId}`)

		if (anchorTarget) {
			anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<BottomContainer onClick={handleClick} role="presentation">
				<Fab sx={{ boxShadow: 'none' }} color="secondary" size="small">
					<ArrowIcon />
				</Fab>
			</BottomContainer>
		</Zoom>
	)
}

export default ScrollToTop
