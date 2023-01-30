import type { RcFile, UploadFile, UploadProps, UploadListType } from 'antd/es/upload/interface';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
export interface UpParams {
  path: string;
  params: {
    bucketName: string;
    category: string;
  };
  disabled?: boolean;
  multiple?: boolean;
  listType?: UploadListType;
  oldFileList?: UploadFile[];
  avatar?: string;
  name?: string;
  onSuccess: (e: unknown) => void;
}
export type Res = { errorCode: number; data: string };
