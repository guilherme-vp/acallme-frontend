import { Axios } from 'axios'
import { QueryClient } from 'react-query'

import { apiUrls } from 'config/api'

export const queryClient = new QueryClient()

export const nodeApi = new Axios({ baseURL: apiUrls.node, timeout: 10000 })
export const javaApi = new Axios({ baseURL: apiUrls.java, timeout: 10000 })
