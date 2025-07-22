import { lazy, Suspense } from 'react';
import ProtectAdmin from './privateRoutes/ProtectAdmin';

const AdminHome = lazy(() => import('@/pages/admin/AdminHome/AdminHome'));
const AdminLogin = lazy(() => import('@/pages/admin/Auth/LoginPage/LoginPage'));

const adminRoutes = {
  path: '/admin/',
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
      path: 'verification-request',
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
