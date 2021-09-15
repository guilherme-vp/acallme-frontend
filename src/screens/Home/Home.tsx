import React from 'react'
import { Container } from './Home.styled'
import { Initial, About, Services } from './sections'

export const Home = () => (
	<Container>
		<Initial />
		<About />
		<Services />
	</Container>
)

export default Home
