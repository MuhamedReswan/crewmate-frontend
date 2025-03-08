import VendorLoginPage from '@/pages/vendor/VendorLogin/VendorLogin.page';
import VendorSignUpPage from '@/pages/vendor/VendorSignUp/VendorSignUp.page';
import { Route, Routes } from 'react-router-dom';
import VendorResetForgotPassword from '@/pages/vendor/ResetForgotPassword/VendorResetForgotPassword';
import ProtectVendor from './privateRoutes/ProtectVendor';
import VendorHomePage from '@/pages/vendor/VendorHomePage/VendorHomePage';
import ProtectVendorIsLogin from './privateRoutes/ProtectVendorIsLogin';

const VendorRoutes = () => {
  return (
<Routes>
    <Route path="register" element={<ProtectVendorIsLogin><VendorSignUpPage /></ProtectVendorIsLogin>} />
    <Route path="Login" element={<ProtectVendorIsLogin><VendorLoginPage /></ProtectVendorIsLogin>} />
    <Route path="reset-password/:token/:email" element={<VendorResetForgotPassword />} />
    <Route path="/" element={<ProtectVendor><VendorHomePage/></ProtectVendor>} />

</Routes>
  )
}

export default VendorRoutes;
