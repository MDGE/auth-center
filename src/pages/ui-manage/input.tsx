import { useMemo, useState } from 'react';
import SearchInputAbort from 'components/search-input-abort';
import { Button, Form } from 'antd';
import Select from 'components/select';
import cn from 'classnames';
import { InputSearchAbortRes } from 'components/search-input-abort/type';

function Index() {
  const [form] = Form.useForm();
  const onFinishFailed = () => {};
  const save = (e: FormData) => {
    console.log(111, e, form.getFieldsValue(true));
  };
  const SearchInputAbortProps = useMemo(
    () => ({
      label: '品牌',
      name: 'brand',
      url: `/admin/operation/brands`,
      getData: (res: InputSearchAbortRes) =>
        res.data.list &&
        res.data.list.map((item) => {
          return {
            label: item.brand.name,
            value: item.brand.id,
            abbr: item.brand.abbr,
          };
        }),
    }),
    [],
  );
  const searchProps = {
    label: '普通搜索框',
    name: 'generalBrand',
    url: `/admin/operation/brands`,
    getData: (res: InputSearchAbortRes) =>
      res.data.list.map((item) => {
        return {
          label: item.brand.name,
          value: item.brand.id,
          abbr: item.brand.abbr,
        };
      }),
  };
  return (
    <Form
      form={form}
      name="profile"
      onFinish={save}
      onFinishFailed={onFinishFailed}
      initialValues={{ brand: [] }}
      labelWrap
      className={cn(`grid grid-cols-4 gap-x-[10px]`)}
    >
      <SearchInputAbort {...SearchInputAbortProps} />
      <Select {...searchProps} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Index;
