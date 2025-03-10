import { RouterProvider } from 'react-router-dom';
import './App.css';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { Toaster } from './components/ui/toaster';
import router from './routes/Router';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log("GOOGLE_CLIENT_ID",GOOGLE_CLIENT_ID);
const App = () => {

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



