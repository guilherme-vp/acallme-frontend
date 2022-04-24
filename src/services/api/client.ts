import { Axios } from 'axios'
import iziToast from 'izitoast'
import { QueryClient } from 'react-query'

import { apiUrls } from 'config/api'

export const queryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			onError: (error: any) => {
				try {
					const errorData = error.response.data

					if (errorData.error) {
						return iziToast.error({ message: errorData.error })
					}
					return iziToast.error({ message: 'Um erro ocorreu, tente novamente.' })
				} catch (e) {
					return iziToast.error({ message: 'Um erro ocorreu, tente novamente.' })
				}
			}
		}
	}
})

export const nodeApi = new Axios({
	baseURL: apiUrls.node,
	timeout: 5000,
	headers: {
		'Content-type': 'application/json'
	},
	validateStatus: status => status >= 200 && status < 400,
	transformRequest: [
		function transformRequest(data) {
			if (data && JSON.stringify(data)) {
				const formattedData = JSON.stringify(data)

				return formattedData
			}

			return data
		}
	],
	transformResponse: [
		function transformResponse(data) {
			return JSON.parse(data)
		}
	]
})
export const javaApi = new Axios({
	baseURL: apiUrls.java,
	timeout: 5000,
	headers: {
		'Content-type': 'application/json'
	},
	validateStatus: status => status >= 200 && status < 400
})

nodeApi.interceptors.request.use(config => {
	const { headers } = config

	const persistedState = localStorage.getItem('storeon')

	let token

	if (persistedState) {
		token = JSON.parse(persistedState).token
	}

	if (token) {
		const newHeaders = { ...headers, Authorization: `Bearer ${token}` }

		config.headers = newHeaders
	}

	return config
})
// javaApi.interceptors.request.use(config => {
// 	const { headers } = config

// 	const persistedState = localStorage.getItem('storeon')

// 	let token

// 	if (persistedState) {
// 		token = JSON.parse(persistedState).token
// 	}

// 	if (token) {
// 		const newHeaders = { ...headers, Authorization: `Bearer ${token}` }

// 		config.headers = newHeaders
// 	}

// 	return config
// })
