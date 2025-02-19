import { Route, Routes } from "react-router-dom";
import SignUpPage from "@/pages/serviceBoy/SignUp/SignUp.page";
import Test from "@/Test";
import LandingPage from "@/pages/common/LandingPage/LandingPage";
import LoginPage from "@/pages/serviceBoy/Login/Login.page";
import ServiceBoyHomePage from "@/pages/serviceBoy/Main/ServiceBoyHomePage";

const ServiceBoyRoutes = () => {
    return (
        <Routes>
            <Route path="test" element={<Test />} />
            <Route path="" element={<ServiceBoyHomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
            <Route path="" element={<LandingPage />} />
            {/* Add more routes as needed */}
        </Routes>
    );
};

export default ServiceBoyRoutes;


