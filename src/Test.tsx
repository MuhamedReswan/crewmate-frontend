import React from 'react'
import { Button } from './components/ui/button'
import { logout } from './redux/slice/serviceBoyAuth.slice'
import { useDispatch } from 'react-redux'
import { ServiceBoyAccessToken, serviceBoyLogout } from './api/serviceBoy'
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
  <hr/>
  
    <Button onClick={async()=>{
    const logoutResponse = await  serviceBoyLogout()
  
    console.log("logoutResponse",logoutResponse)
    dispatch(vendorLogout())
  }}> Vnedor Logout</Button>

<hr/>
<br/>
    <Button onClick={async()=>{
    const tokenTest = await  ServiceBoyAccessToken()
  
    console.log("service boy tokenTest",tokenTest)
 
  }}> Token test</Button>
</>
  )
}

export default Test
