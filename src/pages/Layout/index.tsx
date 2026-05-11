import { Outlet,useNavigate,useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserInfo } from '@/store/modules/user'
import {clearUserInfo} from '@/store/modules/user'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  //点击侧边栏跳转
  const navigate=useNavigate()
  const onMenuClick=(route: any)=>{
    navigate(route.key)
  }
  //根据路径选中侧边栏菜单
  const location=useLocation()
  const pathname=location.pathname
  //获取用户信息
  const dispatch=useDispatch<any>()
  useEffect(()=>{
    dispatch(fetchUserInfo())
  },[dispatch])
  const userInfo=useSelector((state: any)=>state.user.userInfo)
  //退出登录
  const onConfirm=()=>{
    dispatch(clearUserInfo())
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name}</span>

          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>

          </span>

        </div>

      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[pathname]}
            items={items}
            onClick={onMenuClick}
            style={{ height: '100%', borderRight: 0 }}></Menu>

        </Sider>

        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet/>
        </Layout>

      </Layout>

    </Layout>

  )
}
export default GeekLayout
