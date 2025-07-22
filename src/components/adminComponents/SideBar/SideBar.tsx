import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    CircleDot,
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';
import { logout } from '@/api/admin';

const AdminSideBar: React.FC = () => {

    return (
        <div className="w-64 bg-[#0D1117] text-white border-r border-gray-700 flex flex-col h-full transition-colors duration-200">
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <CircleDot size={24} className="text-primary-500" />
                    <span className="font-bold text-lg">CrewMate</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
                    }
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
                    }
                >
                    <Users size={20} />
                    <span>Users</span>
                </NavLink>

                <NavLink
                    to="/dashboard/products"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
                    }
                >
                    <ShoppingCart size={20} />
                    <span>Products</span>
                </NavLink>

                <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                        `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
                    }
                >
                    <BarChart3 size={20} />
                    <span>Analytics</span>
                </NavLink>

                <div className="pt-4 mt-4 border-t border-gray-700">
                    <NavLink
                        to="/dashboard/settings"
                        className={({ isActive }) =>
                            `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
                        }
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/help"
                        className={({ isActive }) =>
                            `sidebar-item ${isActive ? 'bg-[#161B22] text-white font-semibold' : 'text-gray-400 hover:text-white'}`
                        }
                    >
                        <HelpCircle size={20} />
                        <span>Help & Support</span>
                    </NavLink>
                </div>
            </nav>

            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={logout}
                    className="sidebar-item w-full justify-start text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSideBar;
