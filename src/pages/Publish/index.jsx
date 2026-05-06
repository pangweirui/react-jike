import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import { getChannelAPI } from '@/apis/article'
import QuillEditor from '@/components/QuillEditor'
import './index.scss'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Select,
} from 'antd'

const Publish = () => {
  //获取频道列表
  const [channelList,setChannelList]=useState([])
  useEffect(()=>{
    const getChannelList=async()=>{
      const res=await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  },[])
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
          initialValues={{ type: 1 }}
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
