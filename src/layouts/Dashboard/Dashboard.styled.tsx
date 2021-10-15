import styled from 'styled-components'

import { IconButton, Drawer as MuiDrawer, Typography } from '@mui/material'
import { styled as muiStyled, Theme, CSSObject } from '@mui/material/styles'

import { pxToRem } from 'utils/px-to-rem'

const drawerWidth = 240

export const DashboardContainer = styled.div`
	display: flex;
	min-height: 100vh;
	background-color: ${props => props.theme.background.light};
`

export const Title = styled(Typography)`
	color: ${props => props.theme.colors.primary};
	font-weight: 600;
`

export const DrawerHeader = muiStyled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: '40px',
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}))

export const ContainerButton = muiStyled('div')(({ theme }) => ({
	position: 'fixed',
	top: 'calc(50% - 48px)',
	marginLeft: '-16px',
	border: '0 none',
	zIndex: theme.zIndex.drawer + 2
}))

export const CloseButton = styled(IconButton).attrs({ color: 'primary' })`
	width: 36px;
	height: 36px;
	display: flex;
	font-size: ${pxToRem(16)};
	justify-content: center;
	background-color: ${props => props.theme.background.light} !important;
	box-shadow: -2px 4px 6px 0 rgba(0, 0, 0, 0.05);
`

export const SidebarContainer = styled.div`
	display: flex;
	border: 0 none;
`

export const DashboardMain = styled.main`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 22px 40px;
	background-color: ${props => props.theme.background.main};

	@media only screen and (max-width: 600px) {
		padding: 16px 20px;
	}
`

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden'
})

export const Drawer = muiStyled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		zIndex: theme.zIndex.drawer + 1,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme)
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme)
		})
	})
)
