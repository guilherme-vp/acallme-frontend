import React, { useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import iziToast from 'izitoast'
import { Home } from 'screens/Home'
import { Login } from 'screens/Login'
import { SignUp } from 'screens/SignUp'
import { HomeLayout } from './layouts/Home'
import { AuthLayout } from './layouts/Auth'
import 'izitoast/dist/css/iziToast.min.css'

iziToast.settings({
	position: 'bottomLeft',
	maxWidth: 400
})

const App = () => {
	const smDown = useMediaQuery('(max-width: 600px)')

	useEffect(() => {
		if (smDown) {
			iziToast.settings({
				position: 'topLeft'
			})
		} else {
			iziToast.settings({
				position: 'bottomLeft',
				maxWidth: 400
			})
		}
	}, [smDown])

	return (
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
}

export default App
