import { lazy, Suspense } from 'react';
import ProtectAdmin from './privateRoutes/ProtectAdmin';
import AdminLayout from '@/layouts/AdminLayout';
import ServiceBoysManage from '@/pages/admin/ServiceBoyManage/ServiceBoysManage';
import VendorVerfication from '@/pages/admin/VendorVerification/VendorVerfication';
import ServiceBoyVerfication from '@/pages/admin/ServiceBoyVerification/ServiceBoyVerification';
import ServiceBoyDetailsPage from '@/pages/admin/ServiceBoyManage/ServiceBoyDetailsPage';
import SingleVerifcationPage from '@/pages/admin/ServiceBoyVerification/SingleVerifcationPage';
import VendorVerificationDetails from '@/pages/admin/VendorVerification/SingleVendorVerificationPage';
import VendorManagement from '@/pages/admin/VendorManage/VendorManagement';
import VendorDetailsPage from '@/pages/admin/VendorManage/VendorDetailsPage';

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
      path: "vendors/verify",
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
      path: "service-boys/verify/:id",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
            < SingleVerifcationPage/>
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
<VendorManagement/>
          </Suspense>
        </ProtectAdmin>
      ),
    },
    {
      path: "vendors/:id",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
<VendorDetailsPage/>
          </Suspense>
        </ProtectAdmin>
      ),
    },
      {
      path: "vendors/verify/:id",
      element: (
        <ProtectAdmin>
          <Suspense fallback={<div>Loading...</div>}>
            < VendorVerificationDetails/>
          </Suspense>
        </ProtectAdmin>
      ),
    },
  ],
};

export default adminRoutes;
