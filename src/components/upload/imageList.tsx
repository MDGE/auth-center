import { useState } from 'react';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Avatar, message, Upload, Button } from 'antd';
import type { RcFile, UploadFile, UploadProps, UploadListType } from 'antd/es/upload/interface';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { post } from 'utils/request';
import ImgCrop from 'antd-img-crop';
import { UpParams, Res } from './uploadType';

const Index = (props: UpParams) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const {
    listType = 'text',
    disabled = false,
    multiple = false,
    params,
    oldFileList = [],
    onSuccess,
  } = props;
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('仅能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const customRequest = (opt: UploadRequestOption) => {
    setLoading(true);
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
          message.success('上传成功');
          setImageUrl(res.data);
          onSuccess(res.data);
        }
      })
      .catch(() => {
        message.error('上传失败');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    console.log(src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const [fileList, setFileList] = useState<UploadFile[]>(oldFileList);
  const onChange: UploadProps['onChange'] = (e) => {
    setFileList(e.fileList);
  };
  const staticProps: UploadProps = {
    listType,
    customRequest,
    beforeUpload,
    disabled,
    multiple,
    onChange,
    fileList,
    // showUploadList: false,
    // className: 'upload-list-inline',
    onPreview,
  };
  const uploadButton = (
    <div>
      {loading ? <Button icon={<UploadOutlined />}>Upload</Button> : <div>选择文件</div>}
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      {/* <div style={{ marginTop: 8 }}>上传文件</div> */}
    </div>
  );
  const url = `admin/gubang-oss/files/download/${
    params.bucketName.includes('public') ? 'public' : 'private'
  }?bucket=${params.bucketName}&fileName=${imageUrl}`;

  return (
    <>
      {/* {imageUrl ? (
        <div>
          <Image src={url} width={100} preview={{ mask: <div>预览</div> }} />
        </div>
      ) : null} */}
      <ImgCrop rotate>
        <Upload {...staticProps}>
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>
      </ImgCrop>
    </>
  );
};

export default Index;
