import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Home } from 'screens/Home'
import { Login } from 'screens/Login'
import { SignUp } from 'screens/SignUp'
import { HomeLayout } from './layouts/Home'
import { AuthLayout } from './layouts/Auth'

const App = () => (
	<Router>
		<Switch>
			<Route path="/" exact>
				<HomeLayout>
					<Home />
				</HomeLayout>
			</Route>
			<Route path="/login">
				<AuthLayout>
					<Login />
				</AuthLayout>
			</Route>
			<Route path="/signup">
				<AuthLayout>
					<SignUp />
				</AuthLayout>
			</Route>
		</Switch>
	</Router>
)

export default App
