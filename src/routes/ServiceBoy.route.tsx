import { Route, Routes } from "react-router-dom";
import SignUpPage from "@/pages/serviceBoy/SignUp/SignUp.page";
import Test from "@/Test";
import LandingPage from "@/pages/common/LandingPage/LandingPage";
import LoginPage from "@/pages/serviceBoy/Login/Login.page";
import ServiceBoyHomePage from "@/pages/serviceBoy/Main/ServiceBoyHomePage";
import Test2 from "@/Test2";
import ResetForgetPassword from "@/pages/serviceBoy/ResetForgetPassword/ResetForgetPassword";
import ProtectServiceBoy from "./privateRoutes/ProtectServiceBoy";

const ServiceBoyRoutes = () => {
    return (
        <Routes>
            <Route path="test" element={<Test/>} />
            <Route path="test2" element={<ProtectServiceBoy><Test2 /></ProtectServiceBoy>} />
            <Route path="" element={<ProtectServiceBoy><ServiceBoyHomePage /></ProtectServiceBoy>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
            <Route path="reset-password/:token/:email" element={<ResetForgetPassword />} />
            <Route path="" element={<LandingPage />} />
            {/* Add more routes as needed */}
        </Routes>
    );
};

export default ServiceBoyRoutes;


