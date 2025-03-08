import LandingPage from '@/pages/common/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'

const CommonRoutes = () => {
  return (
<Routes>
    <Route path='/' element={<LandingPage/>}/>
</Routes>
  )
}

export default CommonRoutes
