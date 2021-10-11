import React from 'react'
import { Toolbar } from '@mui/material'
import { ScrollToTop } from 'components/ScrollToTop'
import { HeaderHome } from 'parts/Header'
import { FooterHome } from 'parts/Footer'
import { Copyright } from 'parts/Copyright'
import { Container, LayoutDivider, Main } from './Home.styled'

export const HomeLayout: React.FC = ({ children }) => {
	const scrollAnchor = 'top-anchor'

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
