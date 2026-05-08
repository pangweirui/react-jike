import { Link,useSearchParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import { createArticleAPI,getArticleDetailAPI } from '@/apis/article'
import useChannel from '@/hooks/useChannel'
import QuillEditor from '@/components/QuillEditor'
import './index.scss'
import {
  message,
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Select,
  Radio,
  Upload,
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

const Publish = () => {
  //获取频道列表
  const {channelList}=useChannel()
  //提交表单
  const onFinish=async(formValue)=>{
    if(imageType !== imageList.length){
      message.error('请上传正确的图片数量')
      return
    }
    const {title,content,channel_id}=formValue
    const params={
      title,
      content,
      cover:{
        type:imageType  ,
        images:imageList.map(item=>item.response.data.url)
      },
      channel_id
    }
    await createArticleAPI(params)
    message.success('发布成功')
  }
  //回填数据
  const [searchParams]=useSearchParams()
  const articleID=searchParams.get('id')
  const [form]=Form.useForm()
  useEffect(()=>{
    if(!articleID) return
    const getArticleDetail=async()=>{
      try{
        const res=await getArticleDetailAPI(articleID)
        const {data}=res
        const {cover}=data
        form.setFieldsValue({
          ...data,
          type:data.cover.type
        })
        setImageType(cover.type)
        setImageList(cover.images.map(url=>({
          url,
        })))
      }catch(error){
        message.error(error.message || '获取文章详情失败')
      }
    }
    getArticleDetail()
  },[articleID,form])
  //上传回调
  const [imageList,setImageList]=useState([])
  const onChange=(info)=>{
    setImageList(info.imageList)
  }
  //切换封面单选框类型
  const [imageType,setImageType]=useState(0)
  const onTypeChange=(e)=>{
    setImageType(e.target.value)
  }
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to="/">首页</Link> },
              { title: '发布文章' },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select
              placeholder="请选择文章频道"
              style={{ width: 400 }}
              options={
                channelList.map(item=>(
                  {
                    value:item.id,
                    label:item.name
                  }
                ))
              }
            />
          </Form.Item>
          
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>

                <Radio value={3}>三图</Radio>

                <Radio value={0}>无图</Radio>

              </Radio.Group>

            </Form.Item>

            { imageType > 0 && <Upload
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name="image"
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>

            </Upload>}

          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <QuillEditor className="publish-quill" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
