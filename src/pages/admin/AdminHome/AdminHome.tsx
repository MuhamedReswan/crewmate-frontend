import { LineChart, BarChartBig, Users, Calendar, Settings, Bell, Moon, LogOut } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/admin';
import ErrorMessage from '@/components/common/Message/Error.message';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
// import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { adminLogout } from '@/redux/slice/adminAuth.slice';



const AdminHome = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      console.log("admin logout clicked");
      const response = await logout()
      console.log("response admin logut", response)
      if (response && response.statusCode === 200) {
        dispatch(adminLogout())
        toast({
          description: <SuccessMessage message={response.message} className="" />,
        })
        navigate('/admin/');
      } else {
        toast({
          description: <ErrorMessage message={response.message} />,
        })
      }

    } catch (error) {
      toast({
        description: <ErrorMessage message={error.message} />,
      })
    }


  }

  // Exact data from the image
  const revenueData = [
    { month: 'Jan', value: 20 },
    { month: 'Feb', value: 40 },
    { month: 'Mar', value: 30 },
    { month: 'Apr', value: 70 },
    { month: 'May', value: 50 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 60 },
    { month: 'Aug', value: 80 },
    { month: 'Sep', value: 70 },
    { month: 'Oct', value: 90 },
    { month: 'Nov', value: 85 },
    { month: 'Dec', value: 95 },
  ];

  const vendorData = [
    { value: 15254 },
    { value: 5548 },
    { value: 2478 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#12132D] p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <BarChartBig className="text-[#8B5CF6]" />
          <span className="font-bold text-xl">CrewMate</span>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li className="flex items-center gap-3 text-[#8B5CF6] bg-[#8B5CF6]/10 p-3 rounded-lg">
              <LineChart size={20} />
              <span>Dashboard</span>
            </li>
            {[
              { icon: Users, label: 'Team' },
              { icon: Calendar, label: 'Vendors' },
              { icon: Users, label: 'serviceBoys' },
              { icon: Calendar, label: 'Calendar' },
              { icon: Settings, label: 'Settings' },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-500 hover:bg-[#8B5CF6]/10 p-3 rounded-lg cursor-pointer transition-colors">
                <item.icon size={20} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </nav>

        <button className="mt-auto flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome Admin</h1>
            <p className="text-gray-500">Analytics your advertising KPI in a single detailed interface.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-[#12132D] rounded-lg transition-colors">
              <Bell size={20} className="text-gray-500" />
            </button>
            <button className="p-2 hover:bg-[#12132D] rounded-lg transition-colors">
              <Moon size={20} className="text-gray-500" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '$50.8K', trend: '+12%' },
            { label: 'Total Users', value: '2300', trend: '+8%' },
            { label: 'Active Users', value: '756', trend: '+5%' },
            { label: 'Conversion Rate', value: '2.3K', trend: '+10%' },
          ].map((stat, index) => (
            <div key={index} className="bg-[#12132D] p-6 rounded-xl">
              <p className="text-gray-500 mb-2">{stat.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-[#22C55E] text-sm">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-[#12132D] p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Total revenue</h2>
              <p className="text-gray-500">Daily</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">$240.8K</span>
              <span className="text-[#22C55E]">+18%</span>
            </div>
          </div>
          <div className="relative h-64 flex items-end justify-between">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
              <span>100k</span>
              <span>80k</span>
              <span>60k</span>
              <span>40k</span>
              <span>20k</span>
              <span>0</span>
            </div>
            {/* Chart bars */}
            <div className="flex-1 flex items-end justify-between pl-12">
              {revenueData.map((item, i) => (
                <div
                  key={i}
                  className="relative w-12 group"
                >
                  <div
                    className="w-full bg-gradient-to-t from-[#8B5CF6]/20 to-transparent rounded-t-lg"
                    style={{
                      height: `${item.value}%`,
                    }}
                  >
                    <div className="w-full h-1 bg-[#8B5CF6] rounded-full absolute bottom-0" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#12132D] p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-6">Event Details</h3>
            <div className="relative flex justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-[#1F2037] fill-none"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="stroke-[#8B5CF6] fill-none"
                  strokeWidth="12"
                  strokeDasharray="553"
                  strokeDashoffset="138"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold">23,648</span>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <span className="text-gray-500">Completed</span>
                    <span className="ml-auto">15,254</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <span className="text-gray-500">Pending</span>
                    <span className="ml-auto">5,548</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span className="text-gray-500">Cancelled</span>
                    <span className="ml-auto">2,478</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#12132D] p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-6">Vendor and Keys</h3>
            <div className="h-48 flex items-end justify-between px-4">
              {vendorData.map((item, i) => (
                <div
                  key={i}
                  className="w-12 bg-gradient-to-t from-[#3B82F6]/20 to-transparent rounded-t-lg relative group"
                  style={{
                    height: `${(item.value / 15254) * 100}%`,
                  }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">
                    {item.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminHome;










