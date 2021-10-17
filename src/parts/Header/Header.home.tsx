import React from 'react'

import { AppBar, Grid, Button, useMediaQuery, Theme } from '@mui/material'
import { Link } from 'react-router-dom'

import { SmoothLink } from 'components/SmoothLink'
import { useIntl } from 'hooks'
import { LOGIN } from 'routes'

import {
	ContactButton,
	Container,
	Content,
	MenuOption,
	RightContent,
	Title
} from './Header.styled'

export const HeaderHome = () => {
	const intl = useIntl()
	const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

	return (
		<AppBar position="fixed" style={{ border: 'none' }} className="home">
			<Container>
				<Content>
					<Link to="/">
						<Title variant="h1">ACall Me</Title>
					</Link>

					<RightContent>
						<Grid container alignItems="center" spacing={smDown ? 1 : 4}>
							{!smDown && (
								<>
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
								</>
							)}

							<Grid item>
								<Link to={LOGIN}>
									<ContactButton variant="contained">
										{intl.formatMessage({ id: 'home.header.login' })}
									</ContactButton>
								</Link>
							</Grid>
						</Grid>
					</RightContent>
				</Content>
			</Container>
		</AppBar>
	)
}

export default HeaderHome
