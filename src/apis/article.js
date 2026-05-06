import {request} from '@/utils/index'

export function getChannelAPI(){
  return request({
    url:'/channels',
    method:'GET',
  })
}