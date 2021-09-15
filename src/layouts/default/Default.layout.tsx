import React from 'react'
import { Toolbar } from '@material-ui/core'
import { ScrollToTop } from 'components/ScrollToTop'
import { Header } from 'parts/Header'
import { Container, Main } from './Default.styled'

export const DefaultLayout: React.FC = ({ children }) => {
	const scrollAnchor = 'top-anchor'

	return (
		<Container>
			<Header />
			<Toolbar id={scrollAnchor} />
			<Main>{children}</Main>
			<ScrollToTop anchorId={scrollAnchor} />
		</Container>
	)
}

export default DefaultLayout
