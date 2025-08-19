import { lazy, Suspense } from 'react';
import ProtectAdmin from './privateRoutes/ProtectAdmin';
import AdminLayout from '@/layouts/AdminLayout';
import ServiceBoysManage from '@/pages/admin/ServiceBoyManage/ServiceBoysManage';
import VendorVerfication from '@/pages/admin/VendorVerification/VendorVerfication';
import ServiceBoyVerfication from '@/pages/admin/ServiceBoyVerification/ServiceBoyVerification';
import ServiceBoyDetailsPage from '@/pages/admin/ServiceBoyManage/ServiceBoyDetailsPage';

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
    {
      path: "service-boys",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
<ServiceBoysManage/>
          </Suspense>
        </ProtectAdmin>
      ),
    },
    {
  path: "service-boys/:id",
  element: (
    <ProtectAdmin>
      <Suspense fallback={<div>Loading...</div>}>
<ServiceBoyDetailsPage />
     </Suspense>
    </ProtectAdmin>
  ),
},
    {
      path: "vendors",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>

          </Suspense>
        </ProtectAdmin>
      ),
    },
  ],
};

export default adminRoutes;
