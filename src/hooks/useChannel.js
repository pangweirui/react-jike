import {useState,useEffect} from 'react'
import {getChannelAPI} from '@/apis/article'

//封装获取频道列表的hooks
function useChannel() {
//获取频道列表
  const [channelList,setChannelList]=useState([])
  useEffect(()=>{
    const getChannelList=async()=>{
      const res=await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  },[])

  return {channelList}
}

export default useChannel
