import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {loginAPI,getProfileAPI} from '@/apis/user'
import {setToken as _setToken,getToken} from '@/utils/token'

type UserState = {
  token: string
  userInfo: any
}

const userStore=createSlice({
  name:'user',
  initialState:{
    token:getToken(),
    userInfo:{}
  } as UserState,
  reducers:{
    setToken(state,action: PayloadAction<string>){
      state.token=action.payload
      //将token存储到localStorage中
      _setToken(action.payload)
    },
    setUserInfo(state,action: PayloadAction<any>){
      state.userInfo=action.payload
    },
    clearUserInfo(state){
      state.token=''
      state.userInfo={}
      //将token从localStorage中删除除
      _setToken('')
    }
  }
})

const {setToken,setUserInfo,clearUserInfo}=userStore.actions
const userReducer=userStore.reducer

//异步方法，登录获取token
const fetchLogin=(loginForm: any)=>{
  return async(dispatch: any)=>{
    //发送异步请求
    const res=await loginAPI(loginForm)
    //提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}
//异步方法，获取用户信息
const fetchUserInfo=()=>{
  return async(dispatch: any)=>{
    //发送异步请求
    const res=await getProfileAPI()
    console.log(res);
    //提交同步action进行用户信息的存入
    dispatch(setUserInfo(res.data))
  }
}
export {fetchLogin,fetchUserInfo,clearUserInfo} 
export default userReducer
