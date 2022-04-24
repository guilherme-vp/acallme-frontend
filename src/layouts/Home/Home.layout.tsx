import React from 'react'

import { Toolbar } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'

import { ScrollToTop } from 'components/ScrollToTop'
import { useStoreon } from 'hooks'
import { Copyright } from 'parts/Copyright'
import { FooterHome } from 'parts/Footer'
import { HeaderHome } from 'parts/Header'
import { SPECIALISTS } from 'routes'

import { Container, LayoutDivider, Main } from './Home.styled'

export const HomeLayout = () => {
	const scrollAnchor = 'top-anchor'
	const { token } = useStoreon('token')

	if (token) {
		return <Navigate to={SPECIALISTS} />
	}

	return (
		<Container>
			<HeaderHome />
			<Toolbar id={scrollAnchor} />
			<Main>
				<Outlet />
			</Main>
			<LayoutDivider />
			<FooterHome />
			<LayoutDivider />
			<Copyright />
			<ScrollToTop anchorId={scrollAnchor} />
		</Container>
	)
}

export default HomeLayout
