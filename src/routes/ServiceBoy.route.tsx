import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/serviceBoy/Auth/Login.page";
import SignUpPage from "@/pages/serviceBoy/Auth/SignUp.page";
import Test from "@/Test";

const ServiceBoyRoutes = () => {
    return (
        <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/service-boy/login" element={<LoginPage />} />
            <Route path="/service-boy/register" element={<SignUpPage />} />
            {/* Add more routes as needed */}
        </Routes>
    );
};

export default ServiceBoyRoutes;


