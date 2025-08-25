import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSideBar from "@/components/adminComponents/SideBar/SideBar";
import AdminHeader from "@/components/adminComponents/Header/Header";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("admin-theme");
    return stored === "dark" || stored === "light" ? stored : "light";
  });
  

  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const routesWithoutLayout = ["/admin/login"];
  const shouldHideLayout = routesWithoutLayout.some((route) =>
    pathname.startsWith(route)
  );

  return (
        <div className={`${theme} flex h-screen bg-background text-foreground transition-colors duration-300`}>
      {/* Sidebar (hidden on login/register) */}
      {!shouldHideLayout && <AdminSideBar />}

      {/* Right Side (Header + Content) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (hidden on login/register) */}
        {!shouldHideLayout && (
          <AdminHeader theme={theme} setTheme={setTheme} />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;





// import { Outlet, useLocation } from 'react-router-dom';
// import AdminSideBar from '@/components/adminComponents/SideBar/SideBar';
// import AdminHeader from '@/components/adminComponents/Header/Header';

// const AdminLayout = () => {
//     const { pathname } = useLocation();

//     const routesWithoutLayout = ['/admin/login'];

//     const shouldHideLayout = routesWithoutLayout.some(route => pathname.startsWith(route));

//     console.log('Current pathname:', pathname);
//     console.log('Should hide layout:', shouldHideLayout);

//     return (
//         <div className="flex h-screen bg-[#0D1117] text-white transition-colors duration-300">
//             {!shouldHideLayout && <AdminSideBar />}
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 {!shouldHideLayout && <AdminHeader />}
//                 <main className="flex-1 overflow-auto p-4">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;
