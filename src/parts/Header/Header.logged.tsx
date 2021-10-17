import React from 'react'

import { AppBar, Avatar, Grid, Hidden, IconButton } from '@mui/material'
import faker from 'faker'
import { BiMenuAltLeft as MenuIcon } from 'react-icons/bi'

import { LanguagePicker } from 'components/LanguagePicker'
import { NotificationsPopover } from 'parts/Notifications'

import { Container } from './Header.styled'

interface HeaderProps {
	openDrawer: () => void
}

export const HeaderLogged = ({ openDrawer }: HeaderProps) => (
	// const { user } = useStoreon('user')
	// const [firstName, lastName] = (user?.name as string).split(' ')

	<AppBar sx={{ border: 'none' }} className="dashboard">
		<Container>
			<Grid container justifyContent="space-between" alignItems="center">
				<Grid container item xs="auto">
					<Hidden mdUp>
						<IconButton color="secondary" edge="start" onClick={() => openDrawer()}>
							<MenuIcon />
						</IconButton>
					</Hidden>
				</Grid>
				<Grid container item xs justifyContent="flex-end" alignItems="center">
					<Grid item mr={2}>
						<LanguagePicker />
					</Grid>
					<Grid item mr={2}>
						<NotificationsPopover />
					</Grid>
					<Grid item>
						<Avatar src={faker.image.people()} alt="top-avatar">
							{/* {gestInitials(firstName as string, lastName)} */}
						</Avatar>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	</AppBar>
)

export default HeaderLogged
