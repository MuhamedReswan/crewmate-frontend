import React from 'react';

import { useNavigate } from 'react-router-dom';
// import crewmateLogo from '../../../assets/images/crewmate-logo.png';

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <nav className="bg-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side with logo and navigation */}
        <div className="flex items-center space-x-8">
          {/* Logo and brand section */}
          <div className="flex items-center">
            {/* Replace src with your actual logo */}
            <img 
              src={'https://www.crewmate.co.in/assets/images/crewmate-logo.png'} 
              alt="Logo" 
              className="h-6 w-6 mr-2"
            />
            <span className="text-indigo-700 font-medium">CrewMate</span>
          </div>
          
          {/* Navigation links */}
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-indigo-700 font-medium border-b-2 border-indigo-700"
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900"
            >
              Service
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900"
            >
              About
            </a>
          </div>
        </div>

<div className="flex items-center space-x-6">
<button className="bg-indigo-700 text-white px-6 py-1.5 rounded hover:bg-indigo-800 transition-colors" 
        onClick={()=>navigate('/service-boy/register')}>Sign Up
        </button>
<button className="bg-indigo-700 text-white px-6 py-1.5 rounded hover:bg-indigo-800 transition-colors" 
        onClick={()=>navigate('/service-boy/login')}> Login
        </button>
</div>
        
      </div>
    </nav>
  );
};

export default Navbar;