interface Params {
  bucketName: string;
  category: string;
}
export const showImg = (url: string, params: Params): string => {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  } else {
    return `admin/gubang-oss/files/download/${
      params.bucketName.includes('public') ? 'public' : 'private'
    }?bucket=${params.bucketName}&fileName=${url}`;
  }
};
