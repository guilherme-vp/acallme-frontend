import React from 'react'
import { Router } from '@reach/router'

import { HOME } from './routes'
import { Home } from './screens/Home'

const App = () => (
	<>
		<Router>
			<Home path={HOME} default />
		</Router>
	</>
)

export default App
