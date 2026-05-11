import { createBrowserRouter } from 'react-router-dom'
import AuthRoute from'@/components/AuthRoutes'
import {lazy,Suspense} from 'react'
import Layout from '@/pages/Layout/index'
import Login from '@/pages/Login/index'

const Home=lazy(()=>import('@/pages/Home/index'))
const Article=lazy(()=>import('@/pages/Article/index'))
const Publish=lazy(()=>import('@/pages/Publish/index'))

const router=createBrowserRouter([
  {
    path:'/',
    element:<AuthRoute><Layout/></AuthRoute>,
    children:[
      {
        index:true,
        element:<Suspense fallback={<div>加载中...</div>}><Home/></Suspense>
      },
      {
        path:'/article',
        element:<Suspense fallback={<div>加载中...</div>}><Article/></Suspense>
      },
      {
        path:'/publish',
        element:<Suspense fallback={<div>加载中...</div>}><Publish/></Suspense>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  }
])

export default router
