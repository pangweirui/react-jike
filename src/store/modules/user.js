import {createSlice} from '@reduxjs/toolkit'
import request from '@/utils/index'
import {setToken as _setToken,getToken} from '@/utils/token'
const userStore=createSlice({
  name:'user',
  initialState:{
    token:getToken()
  },
  reducers:{
    setToken(state,action){
      state.token=action.payload
      //将token存储到localStorage中
      _setToken(action.payload)
    }
  }
})

const {setToken}=userStore.actions
const userReducer=userStore.reducer

//异步方法，登录获取token
const fetchLogin=(loginForm)=>{
  return async(dispatch)=>{
    //发送异步请求
    const res=await request.post('/authorizations',loginForm)
    //提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

export {fetchLogin}
export default userReducer
