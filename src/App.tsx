import { useRoutes } from 'react-router-dom'
import mainRoutes from 'routes'

const App = () => {
	const routes = useRoutes(mainRoutes)
	return routes
}

export default App
