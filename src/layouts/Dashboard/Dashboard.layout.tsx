import React from 'react'

import { Hidden, SwipeableDrawer, Toolbar } from '@mui/material'
import {
	MdChevronLeft as ArrowCloseIcon,
	MdChevronRight as ArrowOpenIcon
} from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { HeaderLogged } from 'parts/Header'
import { Sidebar } from 'parts/Sidebar'

import * as S from './Dashboard.styled'

export const DashboardLayout: React.FC = ({ children }) => {
	const { dispatch, expanded: open } = useStoreon('expanded')

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
			<Hidden mdUp>
				<SwipeableDrawer
					open={open}
					onOpen={handleOpen}
					onClose={handleClose}
					SlideProps={{ style: { width: '240px' } }}
				>
					<Sidebar onClose={handleClose} open={open} />
				</SwipeableDrawer>
			</Hidden>
			<S.SidebarContainer>
				<Hidden mdDown>
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
				</Hidden>
			</S.SidebarContainer>
			<S.DashboardMain>
				<Toolbar sx={{ height: '77px' }} />
				{children}
			</S.DashboardMain>
		</S.DashboardContainer>
	)
}

export default DashboardLayout
