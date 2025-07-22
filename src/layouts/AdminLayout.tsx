
import { Outlet, useLocation } from 'react-router-dom';
import AdminSideBar from '@/components/adminComponents/SideBar/SideBar';
import AdminHeader from '@/components/adminComponents/Header/Header';

const AdminLayout = () => {
    const { pathname } = useLocation();

    const routesWithoutLayout = ['/admin/login'];

    const shouldHideLayout = routesWithoutLayout.some(route => pathname.startsWith(route));

    return (
        <div className="flex h-screen bg-[#0D1117] text-white transition-colors duration-300">
            {!shouldHideLayout && <AdminSideBar />}
            <div className="flex-1 flex flex-col overflow-hidden">
                {!shouldHideLayout && <AdminHeader />}
                <main className="flex-1 overflow-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
