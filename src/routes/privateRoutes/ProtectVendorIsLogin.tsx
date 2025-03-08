import { RootState } from '@/redux/store/store'
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface ProtectVendorProps {
  children: ReactNode
}

const ProtectVendorIsLogin: React.FC<ProtectVendorProps> = ({ children }) => {
  const navigate = useNavigate()
  const vendorIsLoggedIn = useSelector((state: RootState) => state.vendor?.vendorStatus);

  useEffect(() => {
    if (vendorIsLoggedIn) {
      navigate('/vendor/');
    }
  }, [navigate, vendorIsLoggedIn]);



  if (!vendorIsLoggedIn) {
    return <>{children}</>;
  }

  return null;

}

export default ProtectVendorIsLogin
