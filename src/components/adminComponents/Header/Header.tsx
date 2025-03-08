// import React from 'react';
// // import { useAuth } from '../context/AuthContext';
// // import { useTheme } from '../context/ThemeContext';
// import { Bell, Search, User, Sun, Moon } from 'lucide-react';

// const Header: React.FC = () => {
// //   const { user } = useAuth();
// //   const { theme, toggleTheme } = useTheme();

//   return (
//     <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 py-4 px-6 transition-colors duration-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome, {user?.name || 'Admin'}</h1>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-white rounded-md pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
//             />
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-dark-400" />
//           </div>
          
//           <button 
//             onClick={toggleTheme}
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-dark-300 transition-colors duration-200"
//           >
//             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
          
//           <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-600 dark:text-dark-300 transition-colors duration-200">
//             <Bell size={20} />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
//           </button>
          
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center">
//               <User size={16} className="text-white" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;