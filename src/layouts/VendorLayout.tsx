import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import VendorHeader from '@/components/vendorComponent/VendorHeader/VendorHeader'; 
import VendorSidebar from '@/components/vendorComponent/VendorSidebar/VendorSidebar';

const VendorLayout = () => {
  const { pathname } = useLocation();
  const routesWithoutLayout = ['/vendor/login', '/vendor/register', '/vendor/reset-password'];

  const shouldHideLayout = routesWithoutLayout.some(route => pathname.startsWith(route));

  return (
    <div className="flex h-screen bg-white">
      {!shouldHideLayout && <VendorSidebar />}
      <div className={`flex-1 flex flex-col overflow-hidden`}>
        {!shouldHideLayout && <VendorHeader />}
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
