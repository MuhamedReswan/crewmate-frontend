import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from '../components/Overview';
import Header from '@/components/adminComponents/Header/Header'; 
import Sidebar from '@/components/adminComponents/SideBar/SideBar'; 
// import { useTheme } from '../context/ThemeContext';

const Dashboard: React.FC = () => {
//   const { theme } = useTheme();
  
  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            {/* <Route path="/" element={<Overview />} /> */}
            <Route path="/overview" element={<Overview />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;