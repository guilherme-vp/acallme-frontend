import React, { useEffect } from 'react'

import { CircularProgress, useMediaQuery } from '@mui/material'
import iziToast from 'izitoast'
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'

import { useStoreon } from 'hooks'
import { LOGIN, SIGNUP, HOME, SPECIALISTS, SCHEDULE, HISTORY, VIDEOCALL } from 'routes'
import { Home } from 'screens/Home'
import { Login } from 'screens/Login'
import { Schedule } from 'screens/Schedule'
import { SignUp } from 'screens/SignUp'
import { Specialists } from 'screens/Specialists'
import { Videocall } from 'screens/Videocall'

import { AuthLayout } from './layouts/Auth'
import { DashboardLayout } from './layouts/Dashboard'
import { HomeLayout } from './layouts/Home'
import { VideocallLayout } from './layouts/Videocall'

import 'izitoast/dist/css/iziToast.min.css'
import 'simplebar/dist/simplebar.min.css'

iziToast.settings({
	position: 'bottomLeft',
	maxWidth: 400
})

const App = () => {
	const { dispatch, loading } = useStoreon('loading')
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

	return loading ? (
		<CircularProgress
			style={{ position: 'absolute', left: 0, right: 0, margin: '0 auto', zIndex: 3000 }}
		/>
	) : (
		<Router>
			<Routes>
				<Route element={<HomeLayout />}>
					<Route index element={<Home />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path={LOGIN} element={<Login />} />
					<Route path={SIGNUP} element={<SignUp />} />
				</Route>
				<Route element={<DashboardLayout />}>
					<Route path={SPECIALISTS} element={<Specialists />} />
					<Route path={SCHEDULE} element={<Schedule />} />
					<Route path={HISTORY} element={() => <h1>HISTORY</h1>} />
				</Route>
				<Route element={<VideocallLayout />}>
					<Route path={VIDEOCALL} element={<Videocall />} />
				</Route>
				{/* <Navigate to={HOME} /> */}
			</Routes>
		</Router>
	)
}

export default App
