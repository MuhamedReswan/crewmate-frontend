import React from 'react';
import {
    Search,
    Bell as BellIcon,
    MessageSquare as MessageIcon,
    MoreVertical
} from 'lucide-react';

const VendorHeader = () => {
  return (
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
            <span className="text-sm font-medium">VD</span>
          </div>
          <button>
            <MoreVertical size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
