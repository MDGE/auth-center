import { memo } from 'react';
import { Select, Form } from 'antd';
interface InputProps {
  options: { label: string; value: unknown }[];
  label: string;
  name: string;
  mode?: string;
}
const Index = (props: InputProps) => {
  const { label, options, name } = props;
  const optionProps: Record<string, unknown> = { options };
  if (props.mode) {
    optionProps.mode = props.mode;
  }
  return (
    <Form.Item name={name} label={label}>
      <Select
        allowClear
        notFoundContent={<div className="flex justify-center">暂无数据</div>}
        className={`w-full`}
        {...optionProps}
      />
    </Form.Item>
  );
};
export default memo(Index);
