import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crewmateLogo from '../../../assets/images/CrewMate_logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {setIsOpen(!isOpen);
    console.log("button clicked")
  }

  const linkClass = (path) =>
    location.pathname === path
      ? 'text-[#4B49AC] font-bold'
      : 'text-gray-700 font-bold hover:text-[#4B49AC]';

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="flex items-center">
          <img src={crewmateLogo} alt="site logo" className='h-10 w-10 mr-1' />
          <h1 className="text-2xl font-bold text-[#4B49AC]">CrewMate</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
        <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/services" className={linkClass('/services')}>Services</Link>
          <Link to="/about" className={linkClass('/about')}>About</Link>
          <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className=' md:hidden' onClick={toggleMenu}>
          {isOpen ? <X size={28}  /> : <Menu size={28} />}
        </button>

        {/* Login Button */}
        <button 
          onClick={() => navigate('/service-boy/login')}
          className="hidden md:block bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#3f3d91] transition duration-150"
        >
          Login
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col items-center space-y-4 py-4">
          <Link to="/" className={linkClass('/')} onClick={toggleMenu}>Home</Link>
            <Link to="/services" className={linkClass('/services')} onClick={toggleMenu}>Services</Link>
            <Link to="/about" className={linkClass('/about')} onClick={toggleMenu}>About</Link>
            <Link to="/contact" className={linkClass('/contact')} onClick={toggleMenu}>Contact</Link>
            <button 
              onClick={() => {
                navigate('/service-boy/login');
                toggleMenu();
              }}
              className="bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#3f3d91] transition duration-150"
            >
              Login
            </button>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

