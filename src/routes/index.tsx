import React from 'react'
import { PartialRouteObject } from 'react-router'
import { Home } from 'screens/Home'

const mainRoutes: PartialRouteObject[] = [
	{
		path: '',
		element: <Home />
	}
]

export default mainRoutes
