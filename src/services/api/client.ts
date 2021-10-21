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
				const errorData = JSON.parse(error.response.data)

				if (errorData.error) {
					iziToast.error({ message: errorData.error })
				} else {
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
	validateStatus: status => status >= 200 && status < 400
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
