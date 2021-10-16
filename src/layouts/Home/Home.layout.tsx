import React from 'react'

import { Toolbar } from '@mui/material'
import { Redirect } from 'react-router'

import { ScrollToTop } from 'components/ScrollToTop'
import { useStoreon } from 'hooks'
import { Copyright } from 'parts/Copyright'
import { FooterHome } from 'parts/Footer'
import { HeaderHome } from 'parts/Header'
import { SPECIALISTS } from 'routes'

import { Container, LayoutDivider, Main } from './Home.styled'

export const HomeLayout: React.FC = ({ children }) => {
	const scrollAnchor = 'top-anchor'
	const { token } = useStoreon('token')

	if (token) {
		return <Redirect to={SPECIALISTS} />
	}

	return (
		<Container>
			<HeaderHome />
			<Toolbar id={scrollAnchor} />
			<Main>{children}</Main>
			<LayoutDivider />
			<FooterHome />
			<LayoutDivider />
			<Copyright />
			<ScrollToTop anchorId={scrollAnchor} />
		</Container>
	)
}

export default HomeLayout
