import { lazy, Suspense } from 'react';
import ProtectAdmin from './privateRoutes/ProtectAdmin';
import AdminLayout from '@/layouts/AdminLayout';
import ServiceBoyVerfication from '@/pages/admin/ServiceBoyVerification/ServiceBoyVerification';
import VendorVerfication from '@/pages/admin/VendorVerification/VendorVerfication';

const AdminHome = lazy(() => import('@/pages/admin/AdminHome/AdminHome'));
const AdminLogin = lazy(() => import('@/pages/admin/Auth/LoginPage/LoginPage'));

const adminRoutes = {
  path: '/admin/',
  element: <AdminLayout />,
  children: [
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminLogin />
        </Suspense>
      ),
    },
    {
      index: true,
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminHome />
          </Suspense>
        </ProtectAdmin>
      ),
    },
    {
      path: "vendor/verify",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
            <VendorVerfication />
          </Suspense>
        </ProtectAdmin>
      ),
    },
    {
      path: "service-boy/verify",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
            < ServiceBoyVerfication/>
          </Suspense>
        </ProtectAdmin>
      ),
    },
  ],
};

export default adminRoutes;
