import React from 'react'
import { Toolbar } from '@material-ui/core'
import { ScrollToTop } from 'components/ScrollToTop'
import { Header } from 'parts/Header'
import { Footer } from 'parts/Footer'
import { Copyright } from 'parts/Copyright'
import { Container, LayoutDivider, Main } from './Default.styled'

export const DefaultLayout: React.FC = ({ children }) => {
	const scrollAnchor = 'top-anchor'

	return (
		<Container>
			<Header />
			<Toolbar id={scrollAnchor} />
			<Main>{children}</Main>
			<LayoutDivider />
			<Footer />
			<LayoutDivider />
			<Copyright />
			<ScrollToTop anchorId={scrollAnchor} />
		</Container>
	)
}

export default DefaultLayout
