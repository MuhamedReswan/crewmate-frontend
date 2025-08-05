import {
  LayoutDashboard,
  Briefcase,
  User,
  Bell,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageSquareText
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import crewMateLogo from '../../../assets/images/CrewMate_logo.png';
import ErrorMessage from '../../common/Message/Error.message';
import SuccessMessage from '../../common/Message/SuccessMessage';
import NavItem from '../../common/NavItem/NavItem';
import { serviceBoyLogout } from '@/api/serviceBoy/serviceBoy';
import { useToast } from '@/hooks/use-toast';
import { logout } from '@/redux/slice/serviceBoyAuth.slice';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { Messages } from '@/types/enum.type';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await serviceBoyLogout();
      if (response && response.statusCode === 200) {
        dispatch(logout());
        toast({
          description: <SuccessMessage message={response?.message} />,
        });
        navigate('/service-boy/login');
      } else {
        toast({
          description: <ErrorMessage message='Logout failed' className='' />,
        });
      }
    } catch (error) {
      console.log("logout error from sidebar", error);
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error, Messages.LOGOUT_FAILED)} />,
      });
    }
  };

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '' },
    { icon: <Briefcase size={20} />, text: 'Works', path: 'works' },
    { icon: <User size={20} />, text: 'Profile', path: 'profile' },
    { icon: <MessageSquareText size={20} />, text: 'Messages', path: 'messages' },
    { icon: <Bell size={20} />, text: 'Notifications', path: 'notification' },
    { icon: <Users size={20} />, text: 'Accounts', path: 'wallet' },
  ];

  return (
    <div className={`bg-white border-r transition-all ${isCollapsed ? 'w-16' : 'w-64'}`}>

      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4 border-b`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
          <img src={crewMateLogo} className='w-10 h-10 shrink-0' alt='CrewMate logo' />
          {!isCollapsed && <span className='text-xl font-bold text-[#4B49AC]'>CrewMate</span>}
        </div>
        {!isCollapsed && (
          <button onClick={toggleSidebar} className='text-[#4B49AC]'>
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>

      <nav className='mt-4'>
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            text={!isCollapsed ? item.text : ''}
            active={activeItem === item.text}
            onClick={() => {
              setActiveItem(item.text)
              navigate(`/service-boy/${item.path}`)
            }}
          />
        ))}
        <NavItem
          icon={<LogOut size={20} />}
          text={!isCollapsed ? 'Logout' : ''}
          onClick={handleLogout}
          active={activeItem === 'Logout'}
        />
      </nav>
    </div>
  );
};

export default SideBar;
