import jwt from 'jsonwebtoken'
import { IStoreonModule } from 'storeon'

import { queryClient } from '../services/api/client'
import type { RolesEnum, JUser, User } from '../services/entities'

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
			const expiresIn = token.exp * 1000
			if (Date.now() > expiresIn) {
				store.dispatch('user/removeToken')
			} else {
				store.dispatch('user/getUser')
			}
		}
	})

	store.on('user/getUser', async () => {
		store.dispatch('user/loading', true)
		try {
			// const { data, error } = await queryClient.fetchQuery('', () => {})
			// if (error) {
			// store.dispatch('user/signOut')
			// } else if (data.me) {
			// store.dispatch('user/setUser', data.me.user)
			// }
		} catch {
			store.dispatch('user/signOut')
		} finally {
			store.dispatch('user/loading', false)
		}
	})

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
