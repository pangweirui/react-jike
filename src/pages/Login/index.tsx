import {useDispatch} from 'react-redux'
import {fetchLogin} from '@/store/modules/user'
import {useNavigate} from 'react-router-dom'
import {message} from 'antd'
import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  const dispatch=useDispatch<any>()
  const navigate=useNavigate()
  const onFinish=async(values: any)=>{
    //触发异步action
    await dispatch(fetchLogin(values))
    //登录成功后，跳转到首页
    navigate('/')
    //提示用户
    message.success('登录成功')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {pattern:/^1[3456789]\d{9}$/, message:'请输入正确的手机号'}
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>

          </Form.Item>

        </Form>

      </Card>

    </div>

  )
}

export default Login
