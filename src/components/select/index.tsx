import { memo, useEffect, useState } from 'react';
import { get } from 'utils/request';
import { Select, Spin, Form } from 'antd';
type Params = { page: number; pageSize: number };
interface InputProps<T> {
  label: string;
  url: string;
  name: string;
  mode?: string;
  getData: (args: T) => { label: string; value: number }[];
}
const Index = <T,>(props: InputProps<T>) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const { label, url, name, getData } = props;
  useEffect(() => {
    const params: Params = {
      page: 0,
      pageSize: 100,
    };
    setLoading(true);
    get(url, {
      params,
    }).then((res: { errorCode: number }) => {
      if (res.errorCode === 200) {
        const optionData = getData(res as T);
        setOptions(optionData);
        setLoading(false);
      }
    });
  }, [getData, url]);
  const optionProps: Record<string, unknown> = { options };
  if (props.mode) {
    optionProps.mode = props.mode;
  }
  return (
    <Form.Item name={name} label={label}>
      <Select
        allowClear
        filterOption={true}
        notFoundContent={
          loading ? (
            <Spin className="flex justify-center items-center" size="small" />
          ) : (
            <div className="flex justify-center">暂无数据</div>
          )
        }
        {...optionProps}
        className={`w-full`}
      />
    </Form.Item>
  );
};
export default memo(Index) as typeof Index;
