import type { ColumnsType } from 'antd/es/table';
import { Form, Button, FloatButton, Modal } from 'antd';
import useTable from 'common/hooks/useTable';
import SearchInputAbort from 'components/search-input-abort';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useImmer } from 'common/hooks/useImmer';
import { InputSearchAbortRes } from 'components/search-input-abort/type';
import SearchInputLock from 'components/search-input-lock';

type UpdateList = (arg: unknown) => void;
interface FormParams {
  goodsType: number;
  goodsBrandIds?: string | null;
  status?: boolean | null;
}
const Index = () => {
  const [open, setOpen] = useState(false);
  const columns: ColumnsType<object> = [
    {
      title: '编码',
      dataIndex: 'goodsCode',
    },
    {
      title: '产品组名称',
      dataIndex: 'goodsName',
    },
    {
      title: '品牌',
      render: (row) => {
        return row.brand.name;
      },
    },
    {
      title: '类目',
      render: (row) => {
        return row.goodsCategory.name;
      },
    },
    {
      title: '说明',
      dataIndex: 'note',
    },
    {
      title: '状态',
      render: (row) => {
        switch (row.status) {
          case 1:
            return '是';
          case 0:
            return '否';
          default:
            return;
        }
      },
    },
    {
      title: '操作',
      render: () => {
        return (
          <>
            <Button type="link" onClick={() => setOpen(true)}>
              编辑
            </Button>
            <Button type="link" onClick={() => setOpen(true)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useImmer<FormParams>({
    goodsType: 3,
    status: null,
  });
  const [EasyTable, updateList] = useTable<FormParams>({
    url: `/admin/operation/goods/list`,
    columns,
    rowKey: ((row: { id: string }) => row.id) as unknown as string,
    formValue,
  }) as [() => JSX.Element, UpdateList];
  const onFinishFailed = () => {
    console.log('error');
  };
  const save = (e: { brand: Array<number>; status: boolean | null }) => {
    const { brand, status } = e;
    const formParams: FormParams = {
      goodsType: 3,
      goodsBrandIds: null,
    };
    if (brand && brand.length) {
      formParams.goodsBrandIds = brand.join();
      setFormValue((c) => {
        c.goodsBrandIds = brand.join();
      });
    }
    if (typeof status === 'number') {
      formParams.status = status;
    }
    updateList({ formParams });
  };
  useEffect(() => {
    updateList({ formParams: formValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  const SearchInputLockProps = useMemo(
    () => ({
      label: '状态',
      name: 'status',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    }),
    [],
  );
  const del = () => {
    console.log('click删除');
    setOpen(false);
  };
  return (
    <div className="h-[600px]">
      <Form
        name="table"
        form={form}
        onFinish={save}
        onFinishFailed={onFinishFailed}
        initialValues={{ brand: [] }}
        className={cn(`grid grid-cols-4 gap-x-[20px]`)}
      >
        <SearchInputAbort {...SearchInputAbortProps} />
        <SearchInputLock {...SearchInputLockProps} />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="测试"
        open={open}
        onOk={del}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <div>1111</div>
      </Modal>
      <div>
        <EasyTable />
      </div>
    </div>
  );
};
export default Index;
