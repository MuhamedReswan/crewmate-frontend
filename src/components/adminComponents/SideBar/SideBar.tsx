import React from 'react';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
    BarChartBig
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '@/api/admin/admin';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { adminLogout } from '@/redux/slice/adminAuth.slice';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import ErrorMessage from '@/components/common/Message/Error.message';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { Messages } from '@/types/enum.type';



const AdminSideBar: React.FC = () => {

    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate()


    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response && response.statusCode === 200) {
                dispatch(adminLogout());
                toast({
                    description: <SuccessMessage message={response?.message} />,
                });
                navigate('/admin/');
            } else {
                toast({
                    description: <ErrorMessage message={response?.message} />,
                });
            }
        } catch (error) {
            console.log("logout error from sidebar", error);
            toast({
                description: <ErrorMessage message={getApiErrorMessage(error, Messages.LOGOUT_FAILED)} />,
            });
        }
    };


    const menuItems = [
        { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
        { to: '/admin/service-boys', icon: Users, label: 'Users' },
        { to: '/admin/vendors', icon: ShoppingCart, label: 'Products' },
        { to: '/admin/vendor/verify', icon: BarChart3, label: 'Vendor verication' },
        { to: '/admin/service-boy/verify', icon: BarChart3, label: 'ServiceBoy verication' },
        { to: '/admin/settings', icon: Settings, label: 'Settings' },
        { to: '/admin/help', icon: HelpCircle, label: 'Help & Support' },
    ];

    return (
        <aside className="w-64 bg-[#12132D] p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
                <BarChartBig className="text-[#8B5CF6]" />
                <span className="font-bold text-xl">CrewMate</span>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    {menuItems.map(({ to, icon: Icon, label, end }) => (
                        <li key={label}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-[#8B5CF6]/20 text-[#8B5CF6] font-semibold'
                                        : 'text-muted-foreground hover:text-white hover:bg-[#8B5CF6]/10'
                                    }`
                                }
                            >
                                <Icon size={20} />
                                <span>{label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
};

export default AdminSideBar;




// original
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//     CircleDot,
//     LayoutDashboard,
//     Users,
//     ShoppingCart,
//     BarChart3,
//     Settings,
//     HelpCircle,
//     LogOut
// } from 'lucide-react';
// import { logout } from '@/api/admin';


// const AdminSideBar: React.FC = () => {

//     return (
//         <div className="w-64 bg-[#0D1117] text-white border-r border-gray-700 flex flex-col h-full transition-colors duration-200">
//             <div className="p-4 border-b border-gray-700">
//                 <div className="flex items-center gap-2">
//                     <CircleDot size={24} className="text-primary-500" />
//                     <span className="font-bold text-lg">CrewMate</span>
//                 </div>
//             </div>

//             <nav className="flex-1 p-4 space-y-1">
//                 <NavLink
//                     to="/dashboard"
//                     end
//                     className={({ isActive }) =>
//                         `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
//                     }
//                 >
//                     <LayoutDashboard size={20} />
//                     <span>Dashboard</span>
//                 </NavLink>

//                 <NavLink
//                     to="/dashboard/users"
//                     className={({ isActive }) =>
//                         `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
//                     }
//                 >
//                     <Users size={20} />
//                     <span>Users</span>
//                 </NavLink>

//                 <NavLink
//                     to="/dashboard/products"
//                     className={({ isActive }) =>
//                         `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
//                     }
//                 >
//                     <ShoppingCart size={20} />
//                     <span>Products</span>
//                 </NavLink>

//                 <NavLink
//                     to="/dashboard/analytics"
//                     className={({ isActive }) =>
//                         `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
//                     }
//                 >
//                     <BarChart3 size={20} />
//                     <span>Analytics</span>
//                 </NavLink>

//                 <div className="pt-4 mt-4 border-t border-gray-700">
//                     <NavLink
//                         to="/dashboard/settings"
//                         className={({ isActive }) =>
//                             `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
//                         }
//                     >
//                         <Settings size={20} />
//                         <span>Settings</span>
//                     </NavLink>

//                     <NavLink
//                         to="/dashboard/help"
//                         className={({ isActive }) =>
//                             `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
//                         }
//                     >
//                         <HelpCircle size={20} />
//                         <span>Help & Support</span>
//                     </NavLink>
//                 </div>
//             </nav>

//             <div className="p-4 border-t border-gray-700">
//                 <button
//                     onClick={logout}
//                     className="sidebar-item w-full justify-start text-red-400 hover:text-red-300 transition-colors duration-200"
//                 >
//                     <LogOut size={20} />
//                     <span>Logout</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AdminSideBar;
