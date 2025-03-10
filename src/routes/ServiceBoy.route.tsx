import { lazy, Suspense } from "react";
import ServiceBoyLayout from "@/layouts/serviceBoyLayout";
import ProtectServiceBoyIsLogin from "./privateRoutes/ServiceBoyIsLogin";
import ProtectServiceBoy from "./privateRoutes/ProtectServiceBoy";

const Test = lazy(() => import("@/Test"));
const Test2 = lazy(() => import("@/Test2"));
const LoginPage = lazy(() => import("@/pages/serviceBoy/Login/Login.page"));
const SignUpPage = lazy(() => import("@/pages/serviceBoy/SignUp/SignUp.page"));
const ServiceBoyHomePage = lazy(
    () => import("@/pages/serviceBoy/ServiceBoyHomePage/ServiceBoyHomePage")
);
const ResetForgetPassword = lazy(
    () => import("@/pages/serviceBoy/ResetForgetPassword/ResetForgetPassword")
);

const serviceBoyRoutes = {
    path: "/service-boy/",
    element: (<ServiceBoyLayout />),
    children: [
        {
            index: true,
            element: (
                <ProtectServiceBoy>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ServiceBoyHomePage />
                    </Suspense>
                </ProtectServiceBoy>
            ),
        },
        {
            path: "login",
            element: (
                <ProtectServiceBoyIsLogin>
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginPage />
                    </Suspense>
                </ProtectServiceBoyIsLogin>
            ),
        },
        {
            path: "register",
            element: (
                <ProtectServiceBoyIsLogin>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SignUpPage />
                    </Suspense>
                </ProtectServiceBoyIsLogin>
            ),
        },
        {
            path: "reset-password/:token/:email",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetForgetPassword />
                </Suspense>
            ),
        },
        {
            path: "test",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Test />
                </Suspense>
            ),
        },
        {
            path: "test2",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Test2 />
                </Suspense>
            ),
        },

    ],
};

export default serviceBoyRoutes;
