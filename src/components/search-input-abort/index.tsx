import { memo, useEffect, useState } from 'react';
import { get } from 'utils/request';
import { Select, Spin, Form } from 'antd';
import { Params } from './type';
interface InputProps<T> {
  label: string;
  url: string;
  name: string;
  mode?: string;
  getData: (args: T) => { label: string; value: number }[];
}
const Index = <T,>(props: InputProps<T>) => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
  const { label, url, getData, name } = props;
  useEffect(() => {
    const controller = new AbortController();
    const params: Params = {
      page: 0,
      pageSize: 100,
    };
    if (searchValue) {
      params.keyword = searchValue;
    }
    const { signal } = controller;
    setLoading(true);
    setOptions([]);
    get(url, {
      params,
      signal,
    }).then((res: { errorCode: number }) => {
      if (res.errorCode === 200) {
        const optionData = getData(res as T);
        setOptions(optionData);
        setLoading(false);
      }
    });
    return () => {
      setLoading(false);
      setOptions([]);
      controller.abort();
    };
  }, [getData, searchValue, url]);
  const optionProps: Record<string, unknown> = { options };
  if (props.mode) {
    optionProps.mode = props.mode;
  }
  return (
    <Form.Item name={name} label={label}>
      <Select
        allowClear
        onSearch={setSearchValue}
        notFoundContent={
          loading ? (
            <Spin className="flex justify-center items-center" size="small" />
          ) : (
            <div className="flex justify-center">暂无数据</div>
          )
        }
        showSearch
        {...optionProps}
        className={`w-full`}
      />
    </Form.Item>
  );
};
export default memo(Index) as typeof Index;
