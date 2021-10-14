import React from 'react'

import { AppBar, Avatar, Grid } from '@mui/material'
import faker from 'faker'

import { NotificationsPopover } from 'parts/Notifications'

import { Container } from './Header.styled'

export const HeaderLogged = () => (
	// const { user } = useStoreon('user')
	// const [firstName, lastName] = (user?.name as string).split(' ')

	<AppBar style={{ border: 'none' }}>
		<Container>
			<Grid container justifyContent="flex-end" spacing={2}>
				<Grid item>
					<NotificationsPopover />
				</Grid>
				<Grid item>
					<Avatar src={faker.image.people()} alt="top-avatar">
						{/* {gestInitials(firstName as string, lastName)} */}
					</Avatar>
				</Grid>
			</Grid>
		</Container>
	</AppBar>
)

export default HeaderLogged
