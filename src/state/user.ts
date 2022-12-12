import jwt from 'jsonwebtoken'
import { IStoreonModule } from 'storeon'

import { queryClient } from '../services/api/client'
import { fetchMe as fetchPatient } from '../services/api/patient'
import { fetchMe as fetchSpecialist } from '../services/api/specialist'
import { RolesEnum, JUser, User } from '../services/entities'
import { callSocket, mainSocket, notificationSocket } from 'services/ws/client'

export interface UserState {
	token: string | null
	user: User | null
	role: RolesEnum
	loadingUser: boolean
}

export interface UserEvents {
	'user/set': UserState
	'user/verifyToken': void
	'user/setToken': string
	'user/setRole': RolesEnum
	'user/removeToken': void
	'user/getUser': void
	'user/loading': boolean
	'user/setUser': UserState['user']
	'user/signOut': void
}

export const userModule: IStoreonModule = store => {
	store.on('@init', () => ({
		token: null,
		loadingUser: false
	}))

	store.on('@changed', (_state, data) => {
		if ((data?.token && !data?.user) || (data?.token && data?.user)) {
			store.dispatch('user/verifyToken')
		}
	})

	store.on('user/verifyToken', async state => {
		if (state.token) {
			const token = jwt.decode(state.token) as JUser

			if (!token) {
				store.dispatch('user/removeToken')
				return
			}

			const expiresIn = token.exp * 1000
			if (Date.now() > expiresIn) {
				store.dispatch('user/removeToken')
			} else {
				mainSocket.auth = token
				callSocket.auth = token
				notificationSocket.auth = token

				store.dispatch('user/getUser')
			}
		}
	})

	store.on('user/getUser', async () => {
		store.dispatch('user/loading', true)

		let ok = false

		try {
			const patientData = await fetchPatient()

			store.dispatch('user/setUser', patientData)
			store.dispatch('user/setRole', RolesEnum.Patient)
			ok = true
		} catch {}

		if (!ok) {
			try {
				const specialistData = await fetchSpecialist()

				store.dispatch('user/setUser', specialistData)
				store.dispatch('user/setRole', RolesEnum.Specialist)
			} catch (e) {
				console.log(e)
				store.dispatch('user/signOut')
			}
		}

		store.dispatch('user/loading', false)
	})

	store.on('user/setRole', (_state, data) => ({
		role: data
	}))

	store.on('user/signOut', () => {
		queryClient.clear()
		return {
			user: null,
			token: null
		}
	})

	store.on('user/setUser', (_state, data) => ({
		user: data
	}))

	store.on('user/set', (state, payload) => ({
		...state,
		...payload
	}))

	store.on('user/loading', (_state, isLoading) => ({
		loadingUser: isLoading,
		loading: isLoading
	}))

	store.on('user/setToken', (_state, token) => ({
		token
	}))

	store.on('user/removeToken', () => ({
		token: null,
		user: null
	}))
}
