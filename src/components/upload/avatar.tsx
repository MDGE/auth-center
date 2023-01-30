import { UploadOutlined } from '@ant-design/icons';
import { message, Upload, Button, Form } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { post } from 'utils/request';
import { UpParams, Res } from './uploadType';
const Index = (props: UpParams) => {
  const { params, onSuccess, name } = props;
  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于2MB!');
    }
    return isLt2M;
  };
  const customRequest = (opt: UploadRequestOption) => {
    const { file } = opt;
    const { path } = props;
    const body = new FormData();
    body.append('file', file);
    for (const k in params) {
      body.append(k, params[k]);
    }
    post(path, body)
      .then((res: Res) => {
        if (res.errorCode === 200) {
          onSuccess(res.data);
        }
      })
      .catch(() => {
        message.error('上传失败');
      });
  };

  const staticProps: UploadProps = {
    listType: 'text',
    accept: 'image/*',
    customRequest,
    beforeUpload,
    multiple: false,
    showUploadList: false,
    name,
    maxCount: 1,
  };
  return (
    <Form.Item
      name="file"
      wrapperCol={{ offset: 2 }}
      valuePropName="fileList"
      getValueFromEvent={(e) => {
        console.log(e, 111);
        const isLt2M = e.file.size / 1024 / 1024 < 2;
        if (isLt2M) {
          return e.fileList;
        }
      }}
      // rules={[{ required: true, message: '请上传头像!' }]}
    >
      <Upload {...staticProps}>
        <Button icon={<UploadOutlined />} size={'small'}>
          上传
        </Button>
      </Upload>
    </Form.Item>
  );
};

export default Index;
