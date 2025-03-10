import { lazy, Suspense } from "react";
import VendorLayout from "@/layouts/VendorLayout"; 
import ProtectVendor from "./privateRoutes/ProtectVendor";
import ProtectVendorIsLogin from "./privateRoutes/ProtectVendorIsLogin";

const VendorLoginPage = lazy(() => import("@/pages/vendor/VendorLogin/VendorLogin.page"));
const VendorSignUpPage = lazy(() => import("@/pages/vendor/VendorSignUp/VendorSignUp.page"));
const VendorHomePage = lazy(() => import("@/pages/vendor/VendorHomePage/VendorHomePage"));
const VendorResetForgotPassword = lazy(() => import("@/pages/vendor/ResetForgotPassword/VendorResetForgotPassword"));

const vendorRoutes = {
    path: "/vendor/",
    element: (<VendorLayout />),
    children: [
        {
            index: true,
            element: (
                <ProtectVendor>
                    <Suspense fallback={<div>Loading...</div>}>
                        <VendorHomePage />
                    </Suspense>
                </ProtectVendor>
            ),
        },
        {
            path: "login",
            element: (
                <ProtectVendorIsLogin>
                    <Suspense fallback={<div>Loading...</div>}>
                        <VendorLoginPage />
                    </Suspense>
                </ProtectVendorIsLogin>
            ),
        },
        {
            path: "register",
            element: (
                <ProtectVendorIsLogin>
                    <Suspense fallback={<div>Loading...</div>}>
                        <VendorSignUpPage />
                    </Suspense>
                </ProtectVendorIsLogin>
            ),
        },
        {
            path: "reset-password/:token/:email",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <VendorResetForgotPassword />
                </Suspense>
            ),
        },
    ],
};

export default vendorRoutes;
