import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { StoreContext } from 'storeon/react'

import { queryClient } from 'services/api/client'

import App from './App'
import AppWrappers from './Wrappers'
import { store } from './state/store'

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={store}>
			<QueryClientProvider client={queryClient}>
				<AppWrappers>
					<App />
				</AppWrappers>
			</QueryClientProvider>
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
