import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ServiceBoyRoutes from "./routes/ServiceBoy.route";
import './App.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { Toaster } from './components/ui/toaster';
import VendorRoutes from './routes/Vendor.route';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("GOOGLE_CLIENT_ID",GOOGLE_CLIENT_ID);
const App = () => {

  const router = createBrowserRouter([
    {path: '/service-boy/*', element:<ServiceBoyRoutes/>},
    {path: '/vendor/*', element:<VendorRoutes/>},
    {path: '/*', element:<ServiceBoyRoutes/>}
  ])


  return (
<>
<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
<RouterProvider router={router} />
</GoogleOAuthProvider>
<Toaster />
</>
  )
}

export default App



