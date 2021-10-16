import styled from 'styled-components'

import { alpha, styled as muiStyled } from '@mui/system'
import SimpleBar from 'simplebar-react'

export const Container = styled.div`
	flex-grow: 1;
	height: 100%;
	overflow: hidden;
`

export const SimpleBarStyled = muiStyled(SimpleBar)(({ theme }) => ({
	maxHeight: '100%',
	'& .simplebar-scrollbar': {
		'&:before': {
			backgroundColor: alpha(theme.palette.grey[600], 0.48)
		},
		'&.simplebar-visible:before': {
			opacity: 1
		}
	},
	'& .simplebar-track.simplebar-vertical': {
		width: 10
	},
	'& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
		height: 6
	},
	'& .simplebar-mask': {
		zIndex: 'inherit'
	}
}))
