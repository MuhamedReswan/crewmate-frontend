import { lazy, Suspense } from "react";
import ProtectVendor from "./privateRoutes/ProtectVendor";
import ProtectVendorIsLogin from "./privateRoutes/ProtectVendorIsLogin";
import VendorLayout from "@/layouts/VendorLayout";
import VendorProfile from "@/pages/vendor/ProfilePage/VendorProfile";

const VendorLoginPage = lazy(() => import("@/pages/vendor/VendorLogin/VendorLogin.page"));
const VendorSignUpPage = lazy(() => import("@/pages/vendor/VendorSignUp/VendorSignUp.page"));
const VendorHomePage = lazy(() => import("@/pages/vendor/VendorHomePage/VendorHomePage"));
const Events = lazy(() => import("@/pages/vendor/Events/Event"));
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
        {
            path: "profile",
            element: (
                <ProtectVendor>
                    <Suspense fallback={<div>Loading...</div>}>
                        <VendorProfile />
                    </Suspense>
                </ProtectVendor>
            )
        },
        {
            path: "events",
            element: (
                <ProtectVendor>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Events />
                    </Suspense>
                </ProtectVendor>
            )
        }
    ],
};

export default vendorRoutes;
