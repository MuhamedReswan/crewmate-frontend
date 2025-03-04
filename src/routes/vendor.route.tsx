import VendorLoginPage from '@/pages/vendor/VendorLogin/VendorLogin.page';
import VendorSignUpPage from '@/pages/vendor/VendorSignUp/VendorSignUp.page';
import VendorHome from '@/pages/vendor/Main/VendorHome';
import { Route, Routes } from 'react-router-dom';
import VendorResetForgotPassword from '@/pages/vendor/ResetForgotPassword/VendorResetForgotPassword';
import ProtectVendor from './privateRoutes/ProtectVendor';

const VendorRoutes = () => {
  return (
<Routes>
    <Route path="register" element={<VendorSignUpPage />} />
    <Route path="Login" element={<VendorLoginPage />} />
    <Route path="reset-password/:token/:email" element={<VendorResetForgotPassword />} />
    <Route path="/" element={<ProtectVendor><VendorHome /></ProtectVendor>} />
    {/* <Route path="/vendor/" element={<LoginPage />} /> */}

</Routes>
  )
}

export default VendorRoutes;
