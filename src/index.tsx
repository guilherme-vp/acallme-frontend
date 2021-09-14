import React from 'react'
import ReactDOM from 'react-dom'
import { StoreContext } from 'storeon/react'

import App from './App'
import AppWrappers from './Wrappers'
import { store } from './state/store'

ReactDOM.render(
	<React.StrictMode>
		<StoreContext.Provider value={store}>
			<AppWrappers>
				<App />
			</AppWrappers>
		</StoreContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
