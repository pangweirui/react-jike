import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArticleListAPI,deleteArticleAPI } from '@/apis/article'
import useChannel from '@/hooks/useChannel'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
//引入汉化包
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

const { RangePicker } = DatePicker
const Article = () => {
  const navigate=useNavigate()
  //定义枚举
  const status: Record<number, ReactNode>={
    1:<Tag color="warning">待审核</Tag>,
    2:<Tag color="success">审核通过</Tag>
  }
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: (cover: any) => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data: number) => status[data]

    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: (data: any) => {
        return (
          <Space size="middle">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<EditOutlined />} 
              onClick={()=>{
                navigate(`/publish?id=${data.id}`)
              }}
            />
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={()=>onConfirm(data)  }
              onCancel={()=>onCancel()}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  //获取频道列表
  const {channelList}=useChannel()
  ///获取文章列表
  const [list,setList]=useState<any[]>([])
  const [count,setCount]=useState(0)
  const [loading,setLoading]=useState(true)
  //筛选参数
  const [reqData,setReqData]=useState(
    {
      status:'',
      channel_id:'',
      begin_pubdate:'',
      end_pubdate:'',
      page:1,
      page_size:10
    }
  )
  //筛选
  const onFinish=(formValue: any)=>{
    setReqData({
      ...reqData,
      channel_id:formValue.channel_id,
      status:formValue.status,
      begin_pubdate:formValue.date[0].format('YYYY-MM-DD'),
      end_pubdate:formValue.date[1].format('YYYY-MM-DD'),
    })
  }
  useEffect(()=>{
    const getList=async()=>{
      setLoading(true)
      try{
        const res=await getArticleListAPI(reqData)
        setList(res.data.results)
        setCount(res.data.total_count)
      }finally{
        setLoading(false)
      }
    }
    getList()
  },[reqData])
  //分页
  const onChange=(page: number)=>{
    setReqData({
      ...reqData,
      page,
    })
  }
  //删除
  const onConfirm=async(data: any)=>{
    await deleteArticleAPI(data.id)
    setReqData({
      ...reqData,
    })
  }
  //取消删除
  const onCancel=()=>{
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>

              <Radio value={0}>草稿</Radio>

              <Radio value={2}>审核通过</Radio>

            </Radio.Group>

          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="推荐"
              style={{ width: 120 }}
              options={
                channelList.map(item=>({
                  value:item.id,
                  label:item.name
                }))
              }
            >
            </Select>

          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>

          </Form.Item>

        </Form>

      </Card>

      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={list} 
          loading={loading} 
          locale={loading ? { emptyText: <></> } : undefined} 
          pagination={
            {
              total:count,
              pageSize:reqData.page_size,
              onChange,
            }
          }
        />
      </Card>

    </div>

  )
}

export default Article
