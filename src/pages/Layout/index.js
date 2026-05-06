import request from '@/utils/request'
import {useEffect} from 'react'

const Layout=()=>{
  useEffect(()=>{
    request.get('/user/profile')
  },[])
  return <div>
    Layout
  </div>
}
export default Layout