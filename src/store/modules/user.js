import {createSlice} from '@reduxjs/toolkit'
import request from '@/utils/index'
const userStore=createSlice({
  name:'user',
  initialState:{
    token:''
  },
  reducers:{
    setToken(state,action){
      state.token=action.payload
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

export {setToken,fetchLogin}
export default userReducer
