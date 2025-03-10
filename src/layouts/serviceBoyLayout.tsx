import React from 'react';
import ServiceBoyHeader from '@/components/serviceBoyComponent/ServiceBoyHeader/ServiceBoyHeader';
import SideBar from '@/components/serviceBoyComponent/SideBar/SideBar';
import { Outlet, useLocation } from 'react-router-dom';

const ServiceBoyLayout = () => {
  const { pathname } = useLocation();
  const routesWithoutLayout = ['/service-boy/login', '/service-boy/register', '/service-boy/reset-password'];

  const shouldHideLayout = routesWithoutLayout.some(route => pathname.startsWith(route));

  return (
    <div className="flex h-screen bg-white">
      {!shouldHideLayout && <SideBar />}
      <div className={`flex-1 flex flex-col overflow-hidden`}>
        {!shouldHideLayout && <ServiceBoyHeader />}
        <Outlet />
      </div>
    </div>
  );
};

export default ServiceBoyLayout;



