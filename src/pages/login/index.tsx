import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import useLocalStorage from 'common/hooks/useLocalStorage';
import { post } from 'utils/request';
interface Res {
  data: {
    token: string;
    userId: string;
  };
  errorCode: number;
  message: string;
}
function Index() {
  const [token, setToken] = useLocalStorage('token');
  const [userId, setUserId] = useLocalStorage('userId');
  const navigate = useNavigate();
  useEffect(() => {
    if (token && userId) {
      navigate('/');
    }
  }, [navigate, token, userId]);
  useEffect(() => {
    document.title = '骨棒网运营平台';
  }, []);
  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    if (username && password) {
      post('/admin/user/auth/login', { username, password }, 'multipart/form-data').then(
        (res: Res) => {
          if (res.errorCode === 200) {
            setToken('token', res.data.token);
            setUserId('userId', res.data.userId);
          } else {
            message.error(res.message);
          }
        },
      );
    }
  };

  return (
    <>
      <Form
        name="normal_login"
        className="w-[500px]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            登陆1
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Index;
