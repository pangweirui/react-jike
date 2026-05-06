import { createBrowserRouter } from 'react-router-dom'
import AuthRoute from'@/components/AuthRoutes'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login/index'

const router=createBrowserRouter([
  {
    path:'/',
    element:<AuthRoute><Layout/></AuthRoute>
  },
  {
    path:'/login',
    element:<Login/>
  }
])

export default router
