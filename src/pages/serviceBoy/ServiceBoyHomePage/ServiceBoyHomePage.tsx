import React from 'react';
import {
  Search,
  Bell as BellIcon,
  MessageSquare as MessageIcon,
  MoreVertical
} from 'lucide-react';
;
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import StatCard from '@/components/common/StatCard/StatCard';
import SideBar from '@/components/serviceBoyComponent/SideBar/SideBar';




function ServiceBoyHomePage() {
  const serviceBoy = useSelector((state: RootState) => state.serviceBoy.serviceBoyData);

  return (
    <div className="flex h-screen bg-white">
   {/* Sidebar */}
<SideBar/>
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
              <h1 className="text-2xl font-bold">Welcome {serviceBoy?.name}</h1>
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




export default ServiceBoyHomePage;