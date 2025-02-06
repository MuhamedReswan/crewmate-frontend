import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ServiceBoyRoutes from "./routes/ServiceBoy.route"
import './App.css'

const App = () => {

  const router = createBrowserRouter([
    {path: '/service-boy', element:<ServiceBoyRoutes/>},
    {path: '/*', element:<ServiceBoyRoutes/>}
  ])


  return (
<>
<RouterProvider router={router} />

</>
  )
}

export default App



