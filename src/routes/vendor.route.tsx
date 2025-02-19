import VendorLoginPage from '@/pages/vendor/VendorLogin/VendorLogin.page';
import VendorSignUpPage from '@/pages/vendor/VendorSignUp/VendorSignUp.page';
import VendorHome from '@/pages/vendor/Main/VendorHome';
import { Route, Routes } from 'react-router-dom';

const VendorRoutes = () => {
  return (
<Routes>
    <Route path="register" element={<VendorSignUpPage />} />
    <Route path="Login" element={<VendorLoginPage />} />
    <Route path="" element={<VendorHome />} />
    {/* <Route path="/vendor/" element={<LoginPage />} /> */}

</Routes>
  )
}

export default VendorRoutes;
