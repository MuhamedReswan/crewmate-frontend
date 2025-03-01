import { RootState } from '@/redux/store/store'
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface ProtectServiceBoyProps {
  children: ReactNode
}

const ProtectServiceBoy: React.FC<ProtectServiceBoyProps> = ({ children }) => {
  const serviceBoyIsLoggedIn = useSelector((state: RootState) => state.serviceBoy.serviceBoyStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!serviceBoyIsLoggedIn) {
      navigate('/service-boy/login'); // Redirect to service boy login page if not logged in
    }
  }, [serviceBoyIsLoggedIn, navigate]);

  // If the service boy is logged in, render the children components
  if (serviceBoyIsLoggedIn) {
    return <>{children}</>
  }

  // If not logged in, render nothing (the user is being redirected)
  return null
}

export default ProtectServiceBoy
