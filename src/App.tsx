import React, { useEffect } from 'react'

import { CircularProgress, useMediaQuery } from '@mui/material'
import iziToast from 'izitoast'
import { Redirect, RouteComponentProps, RouteProps } from 'react-router'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { DashboardLayout } from 'layouts/Dashboard'
import { LOGIN, SIGNUP, HOME, SPECIALISTS, SCHEDULE, HISTORY, VIDEOCALL } from 'routes'
import { Home } from 'screens/Home'
import { Login } from 'screens/Login'
import { Schedule } from 'screens/Schedule'
import { SignUp } from 'screens/SignUp'
import { Specialists } from 'screens/Specialists'
import { Videocall } from 'screens/Videocall'

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
	layout?: React.ComponentType<RouteComponentProps>
}

function RouteWrapper({ component: Component, layout: Layout, ...rest }: WrapperProps) {
	return (
		<Route
			{...rest}
			render={props =>
				Layout ? (
					<Layout {...props}>
						<Component {...props} />
					</Layout>
				) : (
					<Component {...props} />
				)
			}
		/>
	)
}

const App = () => {
	const { dispatch, loadingUser } = useStoreon('loadingUser')
	const smDown = useMediaQuery('(max-width: 600px)')

	useEffect(() => {
		if (smDown) {
			iziToast.settings({
				position: 'topRight'
			})
			dispatch('drawer/set', false)
		} else {
			iziToast.settings({
				position: 'bottomRight',
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
				<RouteWrapper path={SPECIALISTS} layout={DashboardLayout} component={Specialists} />
				<RouteWrapper path={SCHEDULE} layout={DashboardLayout} component={Schedule} />
				<RouteWrapper
					path={HISTORY}
					layout={DashboardLayout}
					component={() => <h1>HISTORY</h1>}
				/>
				<RouteWrapper path={VIDEOCALL} component={Videocall} />

				<Redirect to={HOME} />
			</Switch>
		</Router>
	)
}

export default App
