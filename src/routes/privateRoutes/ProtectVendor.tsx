import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/redux/store/store'

interface ProtectVendorProps {
  children: ReactNode
}

const ProtectVendor: React.FC<ProtectVendorProps> = ({ children }) => {
  const navigate = useNavigate()
  const vendorIsLoggedIn = useSelector((state: RootState) => state.vendor?.vendorStatus);

  useEffect(() => {
    if (!vendorIsLoggedIn) {
      navigate('/vendor/login');
    }
  }, [navigate, vendorIsLoggedIn]);



  if (vendorIsLoggedIn) {
    return <>{children}</>;
  }

  return null;

}

export default ProtectVendor
