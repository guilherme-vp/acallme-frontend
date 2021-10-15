import React, { useEffect } from 'react'

import { CircularProgress, useMediaQuery } from '@mui/material'
import iziToast from 'izitoast'
import { RouteComponentProps, RouteProps } from 'react-router'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { DashboardLayout } from 'layouts/Dashboard'
import { LOGIN, SIGNUP, HOME, DASHBOARD, SCHEDULE, HISTORY, SPECIALISTS } from 'routes'
import { Dashboard } from 'screens/Dashboard'
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

interface WrapperProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps>
	layout: React.ComponentType<RouteComponentProps>
}

function RouteWrapper({ component: Component, layout: Layout, ...rest }: WrapperProps) {
	return (
		<Route
			{...rest}
			render={props => (
				<Layout {...props}>
					<Component {...props} />
				</Layout>
			)}
		/>
	)
}

const App = () => {
	const { dispatch, loadingUser } = useStoreon('loadingUser')
	const smDown = useMediaQuery('(max-width: 600px)')

	useEffect(() => {
		if (smDown) {
			iziToast.settings({
				position: 'topLeft'
			})
			dispatch('drawer/set', false)
		} else {
			iziToast.settings({
				position: 'bottomLeft',
				maxWidth: 400
			})
		}
	}, [dispatch, smDown])

	return loadingUser ? (
		<CircularProgress
			style={{ position: 'absolute', left: 0, right: 0, margin: '0 auto', zIndex: 3000 }}
		/>
	) : (
		<Router>
			<Switch>
				<RouteWrapper path={HOME} exact layout={HomeLayout} component={Home} />
				<RouteWrapper path={LOGIN} layout={AuthLayout} component={Login} />
				<RouteWrapper path={SIGNUP} layout={AuthLayout} component={SignUp} />
				<RouteWrapper path={DASHBOARD} layout={DashboardLayout} component={Dashboard} />
				<RouteWrapper
					path={SPECIALISTS}
					layout={DashboardLayout}
					component={() => <h1>SPECIALISTS</h1>}
				/>
				<RouteWrapper
					path={SCHEDULE}
					layout={DashboardLayout}
					component={() => <h1>SCHEDULE</h1>}
				/>
				<RouteWrapper
					path={HISTORY}
					layout={DashboardLayout}
					component={() => <h1>HISTORY</h1>}
				/>

				{/* <Redirect to={HOME} /> */}
			</Switch>
		</Router>
	)
}

export default App
