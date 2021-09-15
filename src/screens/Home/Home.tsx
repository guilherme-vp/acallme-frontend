import React from 'react'
import { LanguagePicker } from 'components/LanguagePicker'
import { Container } from './Home.styled'
import { Initial, About } from './sections'

export const Home = () => (
	<Container>
		<Initial />
		<About />
		<LanguagePicker />
	</Container>
)

export default Home
