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
        <aside className="w-64 bg-surface p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
                <BarChartBig className="text-primary" />
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
                                        ? 'bg-primary-foreground text-primary font-semibold'
                                        : 'text-muted-foreground hover:text-white hover:bg-primary/10'
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
                className="mt-auto flex items-center gap-2 text-muted-foreground hover:text-white transition-colors p-3 bg-gradient-to-bl from-secondary/30 to-transparent rounded-t-lg">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
};

export default AdminSideBar;
