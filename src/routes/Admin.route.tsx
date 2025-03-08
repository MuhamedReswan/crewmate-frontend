import AdminHome from '@/pages/admin/AdminHome/AdminHome'
import AdminLogin from '@/pages/admin/Auth/LoginPage/LoginPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectAdmin from './privateRoutes/ProtectAdmin'

const AdminRoutes = () => {
  return (
<Routes>
    <Route path='/login' element={<AdminLogin/>} />
    <Route path='/' element={<ProtectAdmin><AdminHome/></ProtectAdmin>} />
</Routes>
  )
}

export default AdminRoutes
