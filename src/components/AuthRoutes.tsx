//封装高阶组件
//有token就跳转到首页，没有token就跳转到登录页
import type { ReactNode } from 'react'
import {getToken} from '@/utils/token'
import {Navigate} from 'react-router-dom'

function AuthRoute({children}: { children: ReactNode }){
  const token=getToken()
  if (token) {
    return <>{children}</>
  }
  return <Navigate to={"/login"} replace/>
}
export default AuthRoute
