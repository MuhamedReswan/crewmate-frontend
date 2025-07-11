import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/redux/store/store'

interface ProtectAdminProps {
  children: ReactNode
}

const ProtectAdmin: React.FC<ProtectAdminProps> = ({ children }) => {
  const navigate = useNavigate()
  const adminIsLoggedIn = useSelector((state: RootState) => state.admin?.adminStatus);

  useEffect(() => {
    if (!adminIsLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate, adminIsLoggedIn]);



  if (adminIsLoggedIn) {
    return <>{children}</>;
  }

  return null;

}

export default ProtectAdmin
