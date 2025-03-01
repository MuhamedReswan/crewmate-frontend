import React from 'react'
import { Button } from './components/ui/button'
import { logout } from './redux/slice/serviceBoyAuth.slice'
import { useDispatch } from 'react-redux'
import { serviceBoyLogout } from './api/serviceBoy'
import { vendorLogout } from './redux/slice/vendorAuth.slice'

const Test = () => {
 const dispatch = useDispatch()
  return (
  <>
    <Button onClick={async()=>{
    const logoutResponse = await  serviceBoyLogout()
  
    console.log("logoutResponse",logoutResponse)
    dispatch(logout())
  }}>Service Boy Logout</Button>
  
    <Button onClick={async()=>{
    const logoutResponse = await  serviceBoyLogout()
  
    console.log("logoutResponse",logoutResponse)
    dispatch(vendorLogout())
  }}> Vnedor Logout</Button>
</>
  )
}

export default Test
