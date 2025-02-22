import PasswordReset from '@/components/common/PasswordReset/ForgotPasswordReset'
import { Role } from '@/types/enum.type'
import React from 'react'

const VendorResetForgotPassword = () => {
  return (
     <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <PasswordReset role={Role.VENDOR}/>
    </div>
  )
}

export default VendorResetForgotPassword
