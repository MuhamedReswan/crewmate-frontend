import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('@/pages/common/LandingPage/LandingPage'));

const commonRoutes = {
  path: '/',
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPage />
    </Suspense>
  ),
};

export default commonRoutes;
