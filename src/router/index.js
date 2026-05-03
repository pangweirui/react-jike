import Layout from '@/pages/Layout'
import Login from '@/pages/Login/index'
import { createBrowserRouter } from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>
  },
  {
    path:'/login',
    element:<Login/>
  }
])

export default router
