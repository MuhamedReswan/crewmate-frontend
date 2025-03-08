import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  MessageSquare, 
  Bell, 
  Users, 
  LogOut,
  Search,
  Bell as BellIcon,
  MessageSquare as MessageIcon,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { useToast } from '@/hooks/use-toast';
import ErrorMessage from '@/components/common/Message/Error.message';
import { VendorLogout } from '@/api/vendor';
import { vendorLogout } from '@/redux/slice/vendorAuth.slice';



function VendorHomePage() {
 const vendor =  useSelector((state:RootState)=> state.vendor.vendorData);
const navigate = useNavigate();
const dispatch = useDispatch()
const {toast} = useToast();
const handleLogout = async()=>{
  try {
    const response = await VendorLogout();
    console.log("response",response)
    if(response && response.statusCode === 200){
    
    toast({
      description: <SuccessMessage message={response?.message} />,
    })
    dispatch(vendorLogout());
    navigate('/vendor/login');
  }else{
    toast({
      description:<ErrorMessage message='logout failed' className=""/>
    })
  }
  } catch (error) {
    console.log(error)
  }

}
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="flex items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="bg-[#4B49AC] text-white p-1 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl font-bold text-[#4B49AC]">CrewMate</span>
          </div>
        </div>
        
        <nav className="mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <NavItem icon={<Briefcase size={20} />} text="Works" />
          <NavItem icon={<User size={20} />} text="Profile" />
          <NavItem icon={<MessageSquare size={20} />} text="Messages" />
          <NavItem icon={<Bell size={20} />} text="Notifications" />
          <NavItem icon={<Users size={20} />} text="Accounts" />
          <NavItem  icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} />
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <button className="p-1 mr-4 text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search now"
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B49AC]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-400">
              <BellIcon size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="relative p-1 text-gray-400">
              <MessageIcon size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#4B49AC] flex items-center justify-center text-white">
                <span className="text-sm font-medium">AA</span>
              </div>
              <button>
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Welcome {vendor?.name}</h1>
              <p className="text-gray-600 text-sm">Please update your profile for admin verification.</p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span>Today (10 Jan 2021)</span>
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Section - Illustration */}
            <div className="lg:col-span-2 bg-[#6C7DAC]/20 rounded-lg p-6 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Family hiking illustration" 
                className="max-h-64"
              />
            </div>
            
            {/* Right Section - Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {/* Total Works Allocated */}
              <StatCard 
                title="Total Works Allocated" 
                value="0" 
                percentage="10.00%" 
                days="30" 
                bgColor="bg-[#4B49AC]" 
              />
              
              {/* Total Points Earned */}
              <StatCard 
                title="Total Points Earned" 
                value="0" 
                percentage="22.00%" 
                days="30" 
                bgColor="bg-[#4B49AC]" 
              />
              
              {/* Total Wage earned */}
              <StatCard 
                title="Total Wage earned" 
                value="34040" 
                percentage="2.00%" 
                days="30" 
                bgColor="bg-[#4B49AC]" 
              />
              
              {/* Number of Works Booked */}
              <StatCard 
                title="Number of Works Booked" 
                value="3" 
                percentage="0.22%" 
                days="30" 
                bgColor="bg-red-400" 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


// Define the props for NavItem
interface NavItemProps {
  icon: React.ReactNode; // The icon to display
  text: string; // The text to display
  active?: boolean; // Whether the item is active
  onClick?: () => void; // Optional onClick handler
}

function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <div
      className={`flex items-center px-4 py-3 ${
        active
          ? 'bg-[#4B49AC]/10 text-[#4B49AC] border-r-4 border-[#4B49AC]'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick} // Attach the onClick handler
      style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{text}</span>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  days: string;
  bgColor: string;
}

function StatCard({ title, value, percentage, days, bgColor }: StatCardProps) {
  return (
    <div className={`${bgColor} text-white rounded-lg p-4 flex flex-col justify-between`}>
      <div className="text-sm font-medium mb-2">{title}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-xs">
        {percentage} ({days} days)
      </div>
    </div>
  );
}

export default VendorHomePage;