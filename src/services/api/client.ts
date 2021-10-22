import { Axios } from 'axios'
import iziToast from 'izitoast'
import { QueryClient } from 'react-query'

import { apiUrls } from 'config/api'

const persistedState = localStorage.getItem('storeon')

let token

if (persistedState) {
	token = JSON.parse(persistedState).token
}

export const queryClient = new QueryClient({
	defaultOptions: {
		mutations: {
			onError: (error: any) => {
				try {
					const errorData = JSON.parse(error.response.data)

					if (errorData.error) {
						iziToast.error({ message: errorData.error })
					}
					iziToast.error({ message: 'Um erro ocorreu, tente novamente.' })
				} catch (e) {
					console.error(e)
					iziToast.error({ message: 'Um erro ocorreu, tente novamente.' })
				}
			}
		}
	}
})

export const nodeApi = new Axios({
	baseURL: apiUrls.node,
	timeout: 5000,
	headers: {
		'Content-type': 'application/json',
		authorization: token ? `Bearer ${token}` : ''
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
		'Content-type': 'application/json',
		authorization: token ? `Bearer ${token}` : ''
	},
	validateStatus: status => status >= 200 && status < 400
})
