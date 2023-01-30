import { Button, message, Avatar, Form, Input, Image } from 'antd';
import { useState } from 'react';
import { post, get } from 'utils/request';
import Upload from 'components/upload/avatar';
import { useAtom } from 'jotai';
import { useImmerAtom } from 'jotai-immer';
import { accountAtom } from 'store/atom/jotai-atom';
import { UpParams } from 'components/upload/uploadType';
import { showImg } from 'utils/upload';
import { errorSrc } from 'utils/base64';

export interface Info {
  errorCode: number;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  companyId: number;
  companyName: string;
  username: string;
  password: null;
  salt: null;
  name: string;
  avatar: string;
  phone: string;
  status: number;
  mainRole: number;
  basicRole: number;
  idcard: string;
  idcardPic: string;
  lastLoginTp: Date;
  lastLoginIp: string;
  createTime: Date;
  updateTime: Date;
}

const Index = () => {
  const [account, setAcount] = useImmerAtom(accountAtom);
  const [avatar, setAvatar] = useState(account?.avatar);

  const [form] = Form.useForm();
  const onSuccess = (e: unknown) => {
    setAvatar(e as string);
    form.setFields([{ name: 'avatar', value: e }]);
  };
  const props: UpParams = {
    path: '/admin/gubang-oss/oss/upload',
    params: { bucketName: 'gobone-public', category: 'user' },
    onSuccess,
  };
  const updateAcount = () => {
    get(`/admin/user/user-detail?userId=${localStorage.getItem('userId')}`).then((res: Info) => {
      if (res.errorCode === 200) {
        setAcount(() => res.data);
      }
    });
  };
  const save = () => {
    console.log(form.getFieldsValue(true));
    post('/admin/user/auth/updateProfile', { avatar }).then((res: Res) => {
      if (res.errorCode === 200) {
        message.success('保存成功');
        updateAcount();
      }
    });
  };
  const onFinishFailed = () => {
    console.log('error');
  };
  const url = showImg(avatar || (account?.avatar as string), {
    bucketName: 'gobone-public',
    category: 'user',
  });

  return (
    <div>
      <Form
        form={form}
        name="profile"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onFinish={save}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="用户头像" labelCol={{ span: 2 }} wrapperCol={{ span: 23 }}>
          <Image
            src={url}
            preview={{ mask: '预览', maskClassName: 'rounded-full' }}
            className={'h-[50px] w-[50px] '}
            style={{ clipPath: 'circle(50% at 50% 50%)' }}
            fallback={errorSrc}
          />
        </Form.Item>
        <Upload {...props} />
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Index;
