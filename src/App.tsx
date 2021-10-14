import React, { useEffect } from 'react'

import { CircularProgress, useMediaQuery } from '@mui/material'
import iziToast from 'izitoast'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { DashboardLayout } from 'layouts/Dashboard'
import { LOGIN, SIGNUP, HOME, DASHBOARD } from 'routes'
import { Home } from 'screens/Home'
import { Login } from 'screens/Login'
import { SignUp } from 'screens/SignUp'

import { AuthLayout } from './layouts/Auth'
import { HomeLayout } from './layouts/Home'
import 'izitoast/dist/css/iziToast.min.css'
import 'simplebar/dist/simplebar.min.css'

iziToast.settings({
	position: 'bottomLeft',
	maxWidth: 400
})

const App = () => {
	const { loadingUser } = useStoreon('loadingUser')
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

	return loadingUser ? (
		<CircularProgress
			style={{ position: 'absolute', left: 0, right: 0, margin: '0 auto', zIndex: 3000 }}
		/>
	) : (
		<Router>
			<Switch>
				<Route path={HOME} exact>
					<HomeLayout>
						<Home />
					</HomeLayout>
				</Route>
				<Route path={LOGIN}>
					<AuthLayout>
						<Login />
					</AuthLayout>
				</Route>
				<Route path={SIGNUP}>
					<AuthLayout>
						<SignUp />
					</AuthLayout>
				</Route>
				<Route path={DASHBOARD}>
					<DashboardLayout>
						<h1>Oi</h1>
					</DashboardLayout>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
