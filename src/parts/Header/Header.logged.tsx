import React from 'react'

import { AppBar, Grid, Hidden, IconButton, Theme, useMediaQuery } from '@mui/material'
import { BiMenuAltLeft as MenuIcon } from 'react-icons/bi'

import { LanguagePicker } from 'components/LanguagePicker'
import { useStoreon } from 'hooks'
import { NotificationsPopover } from 'parts/Notifications'

import { Container } from './Header.styled'
import { ProfileMenu } from './components/ProfileMenu'

interface HeaderProps {
	openDrawer: () => void
}

export const HeaderLogged = ({ openDrawer }: HeaderProps) => {
	const { dispatch, user } = useStoreon('user')
	const isMdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const onSignOut = () => {
		dispatch('user/signOut')
	}

	return (
		<AppBar sx={{ border: 'none' }} className="dashboard">
			<Container>
				<Grid container justifyContent="space-between" alignItems="center">
					<Grid container item xs="auto">
						{isMdDown && (
							<IconButton color="secondary" edge="start" onClick={() => openDrawer()}>
								<MenuIcon />
							</IconButton>
						)}
					</Grid>
					<Grid container item xs justifyContent="flex-end" alignItems="center">
						<Grid item mr={2}>
							<LanguagePicker />
						</Grid>
						<Grid item>
							<NotificationsPopover />
						</Grid>
						{user && (
							<Grid item>
								<ProfileMenu {...user} onSignOut={onSignOut} />
							</Grid>
						)}
					</Grid>
				</Grid>
			</Container>
		</AppBar>
	)
}

export default HeaderLogged
