import React from 'react'

import { AppBar, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

import { LanguagePicker } from 'components/LanguagePicker'

import { Container, Content, Title, RightContent } from './Header.styled'

export const HeaderTitle = () => (
	<AppBar position="fixed" style={{ border: 'none' }}>
		<Container>
			<Content>
				<Link to="/">
					<Title variant="h1">ACall Me</Title>
				</Link>
			</Content>
			<RightContent>
				<Grid container alignItems="center" justifyContent="flex-end">
					<Grid item>
						<LanguagePicker />
					</Grid>
				</Grid>
			</RightContent>
		</Container>
	</AppBar>
)

export default HeaderTitle
