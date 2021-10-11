import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { Home } from 'screens/Home'
import { Login } from 'screens/Login'
import { SignUp } from 'screens/SignUp'
import { DefaultLayout } from './layouts/default'

const App = () => (
	<BrowserRouter>
		<Switch>
			<DefaultLayout>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/cadastro">
					<SignUp />
				</Route>
			</DefaultLayout>
		</Switch>
	</BrowserRouter>
)

export default App
