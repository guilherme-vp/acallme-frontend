import React from 'react'

import { Box, BoxProps } from '@mui/material'
import { SxProps, Theme } from '@mui/system'

import { Container, SimpleBarStyled } from './Scrollbar.styled'

interface ScrollbarProps extends BoxProps {
	sx: SxProps<Theme>
	children: React.ReactNode
}

export const Scrollbar = ({ children, sx, ...other }: ScrollbarProps) => {
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)

	if (isMobile) {
		return (
			<Box sx={{ overflowX: 'auto', ...sx }} {...other}>
				{children}
			</Box>
		)
	}

	return (
		<Container>
			{/* @ts-ignore */}
			<SimpleBarStyled timeout={500} clickOnTrack={false} sx={sx} {...other}>
				{children}
			</SimpleBarStyled>
		</Container>
	)
}

export default Scrollbar
