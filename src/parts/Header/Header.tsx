import React from 'react'
import { AppBar, Grid, Button, useMediaQuery, Theme, Hidden } from '@material-ui/core'
import { useIntl } from 'hooks'
import { SmoothLink } from 'components/SmoothLink'
import {
	ContactButton,
	Container,
	Content,
	MenuOption,
	RightContent,
	Title
} from './Header.styled'

export const Header = () => {
	const intl = useIntl()
	const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	return (
		<AppBar position="fixed" style={{ border: 'none' }}>
			<Container>
				<Content>
					<Title variant="h1">ACall Me</Title>

					<RightContent>
						<Grid container alignItems="center" spacing={smDown ? 1 : 4}>
							<Grid item>
								<SmoothLink sectionId="Home" offset={-75}>
									<Button disableRipple>
										<MenuOption variant="h5">
											{intl.formatMessage({ id: 'home.header.home' })}
										</MenuOption>
									</Button>
								</SmoothLink>
							</Grid>

							<Grid item>
								<SmoothLink sectionId="About">
									<Button disableRipple>
										<MenuOption variant="h5">
											{intl.formatMessage({ id: 'home.header.about' })}
										</MenuOption>
									</Button>
								</SmoothLink>
							</Grid>

							<Grid item>
								<SmoothLink sectionId="Services">
									<Button disableRipple>
										<MenuOption variant="h5">
											{intl.formatMessage({ id: 'home.header.services' })}
										</MenuOption>
									</Button>
								</SmoothLink>
							</Grid>

							<Hidden smDown>
								<Grid item>
									<ContactButton variant="contained">
										{intl.formatMessage({ id: 'home.header.contact' })}
									</ContactButton>
								</Grid>
							</Hidden>
						</Grid>
					</RightContent>
				</Content>
			</Container>
		</AppBar>
	)
}

export default Header
