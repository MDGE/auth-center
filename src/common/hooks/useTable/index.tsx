import { Table } from 'antd';
import { useImmer } from 'common/hooks/useImmer';
import { get } from 'utils/request';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
interface Params<T> {
  page?: number;
  pageSize?: number;
  formParams: T;
}
interface EasyTableProps<T> {
  url: string;
  columns: ColumnsType<object>;
  rowKey: string;
  formValue: T;
}
const Index = <T,>(props: EasyTableProps<T>) => {
  const { url, columns, rowKey, formValue } = props;
  const [pag, setPag] = useImmer({
    page: 1,
    pageSize: 10,
  });
  const [tableInfo, setTableInfo] = useImmer({ dataSource: [], total: 0 });
  const updateList = (params: Params<T>) => {
    if (!params.page && !params.pageSize) {
      setPag(() => ({
        page: 1,
        pageSize: 10,
      }));
    }
    const page = params.page ? params.page - 1 : 0;
    const pageSize = params.pageSize ? params.pageSize : 10;
    get(url, {
      params: { page, pageSize, ...params.formParams },
    }).then(
      (res: {
        errorCode: number;
        data: { list: Array<object>; pageInfo: { totalItem: number } };
      }) => {
        if (res.errorCode === 200) {
          setTableInfo(() => ({
            dataSource: res.data.list,
            total: res.data.pageInfo.totalItem,
          }));
        }
      },
    );
  };
  const onChange = (page: number, pageSize: number) => {
    setPag(() => ({
      page,
      pageSize,
    }));
    updateList({ page, pageSize, formParams: formValue });
  };
  const pagination = {
    total: tableInfo.total,
    current: pag.page,
    pageSize: pag.pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (num: number) => `共 ${num} 条`,
    onChange,
    position: ['bottomCenter'],
  } as TablePaginationConfig;
  const EasyTable = () => (
    <Table
      columns={columns}
      rowKey={rowKey}
      dataSource={tableInfo.dataSource}
      pagination={pagination}
    />
  );

  return [EasyTable, updateList];
};
export default Index;
