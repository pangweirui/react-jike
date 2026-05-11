import {request} from '@/utils/index'

//获取频道列表
export function getChannelAPI(){
  return request({
    url:'/channels',
    method:'GET',
  })
}

//提交表单
export function createArticleAPI(data: any){
  return request({
    url:'/mp/articles?draft=false',
    method:'POST',
    data
  })
}

//获取文章列表
export function getArticleListAPI(params: any){
  return request({
    url:'/mp/articles',
    method:'GET',
    params
  })
}

//删除文章
export function deleteArticleAPI(id: string | number){
  return request({
    url:`/mp/articles/${id}`,
    method:'DELETE',
  })
}

//获取文章详情
export function getArticleDetailAPI(id: string | number){
  return request({
    url:`/mp/articles/${id}`,
  })
}

//更新文章
export function updateArticleAPI(id: string | number,data: any){
  return request({
    url:`/mp/articles/${id}?draft=false`,
    method:'PUT',
    data
  })
}
