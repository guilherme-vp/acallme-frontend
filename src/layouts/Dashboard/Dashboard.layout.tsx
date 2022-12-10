import React from 'react'

import { SwipeableDrawer, Theme, Toolbar, useMediaQuery } from '@mui/material'
import {
	MdChevronLeft as ArrowCloseIcon,
	MdChevronRight as ArrowOpenIcon
} from 'react-icons/md'
import { Link, Navigate, Outlet } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { HeaderLogged } from 'parts/Header'
import { Sidebar } from 'parts/Sidebar'
import { LOGIN } from 'routes'

import * as S from './Dashboard.styled'

export const DashboardLayout = () => {
	const { dispatch, expanded: open, token } = useStoreon('expanded', 'token')
	const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	if (!token) {
		return <Navigate to={LOGIN} />
	}

	const handleOpen = () => {
		dispatch('drawer/set', true)
	}

	const handleClose = () => {
		dispatch('drawer/set', false)
	}

	const handleToggle = () => {
		dispatch('drawer/set', !open)
	}

	return (
		<S.DashboardContainer>
			<HeaderLogged openDrawer={() => handleOpen()} />
			{!isMdUp && (
				// @ts-ignore
				<SwipeableDrawer
					open={open}
					onOpen={handleOpen}
					onClose={handleClose}
					// SlideProps={{ style: { width: '240px' } }}
				>
					<Sidebar onClose={handleClose} open={open} />
				</SwipeableDrawer>
			)}
			<S.SidebarContainer>
				{isMdUp && (
					<>
						<S.Drawer variant="permanent" open={open} onClose={handleClose}>
							<S.DrawerHeader>
								<Link to="/">
									<S.Title variant="h1">{open ? 'ACall Me' : 'AC'}</S.Title>
								</Link>
							</S.DrawerHeader>
							<Sidebar open={open} />
						</S.Drawer>
						<div>
							<S.ContainerButton>
								<S.CloseButton size="small" onClick={handleToggle}>
									{open ? <ArrowCloseIcon /> : <ArrowOpenIcon />}
								</S.CloseButton>
							</S.ContainerButton>
						</div>
					</>
				)}
			</S.SidebarContainer>
			<S.DashboardMain>
				<Toolbar sx={{ height: '66px' }} />
				<Outlet />
			</S.DashboardMain>
		</S.DashboardContainer>
	)
}

export default DashboardLayout
