import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/serviceBoy/Login.page";
import SignUpPage from "@/pages/serviceBoy/SignUp.page";

const ServiceBoyRoutes = () => {
    return (
        <Routes>
            <Route path="/service-boy/login" element={<LoginPage />} />
            <Route path="/service-boy/register" element={<SignUpPage />} />
            {/* Add more routes as needed */}
        </Routes>
    );
};

export default ServiceBoyRoutes;


