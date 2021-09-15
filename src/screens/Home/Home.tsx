import React from 'react'
import { LanguagePicker } from 'components/LanguagePicker'
import { Container } from './Home.styled'
import { Initial, About, Services } from './sections'

export const Home = () => (
	<Container>
		<Initial />
		<About />
		<Services />
		<LanguagePicker />
	</Container>
)

export default Home
