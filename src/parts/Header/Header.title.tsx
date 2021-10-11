import React from 'react'
import { AppBar } from '@mui/material'
import { Link } from 'react-router-dom'

import { Container, Content, Title } from './Header.styled'

export const HeaderTitle = () => (
	<AppBar position="fixed" style={{ border: 'none' }}>
		<Container>
			<Content>
				<Link to="/">
					<Title variant="h1">ACall Me</Title>
				</Link>
			</Content>
		</Container>
	</AppBar>
)

export default HeaderTitle
