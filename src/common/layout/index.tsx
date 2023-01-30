import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Breadcrumb, Dropdown, Result } from 'antd';
import { useAtom } from 'jotai';
import { accountAtom } from 'store/atom/jotai-atom';
import { useImmerAtom } from 'jotai-immer';
import type { MenuProps } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import menus from 'menus';
import mainRoutes from 'routes/mainRoutes';
import useLocalStorage from 'common/hooks/useLocalStorage';
const { Header, Content, Sider } = Layout;
import { get } from 'utils/request';
type RoutesItem = {
  index?: boolean;
  name: string;
  element?: JSX.Element;
  path?: string;
  children?: RoutesItem[];
};
export interface AccountInfo {
  errorCode: number;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  companyId: number;
  companyName: string;
  username: string;
  password: null;
  salt: null;
  name: string;
  avatar: string;
  phone: string;
  status: number;
  mainRole: number;
  basicRole: number;
  idcard: string;
  idcardPic: string;
  lastLoginTp: Date;
  lastLoginIp: string;
  createTime: Date;
  updateTime: Date;
}
function Index() {
  const [account, setAccount] = useImmerAtom(accountAtom);
  const [collapsed, setCollapsed] = useState(false);
  const [token, , clearValue] = useLocalStorage('token');
  const [userId] = useLocalStorage('userId');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
    }
  }, [navigate, token, userId]);
  useEffect(() => {
    get(`/admin/user/user-detail?userId=${localStorage.getItem('userId')}`).then(
      (res: AccountInfo) => {
        if (res.errorCode === 200) {
          setAccount(() => res.data);
        }
      },
    );
  }, [setAccount]);
  console.log('layout');

  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const nameArr: string[] = [];
  const startRoute = mainRoutes.find((cur) => {
    if (cur.path === pathSnippets[0]) {
      return cur;
    }
    return null;
  }) as RoutesItem;
  nameArr.push(startRoute.name);
  let current: RoutesItem = startRoute;
  const findName = (cur: RoutesItem, path: string) => {
    cur.children?.find((item: RoutesItem) => {
      if (item.path === path) {
        nameArr.push(item.name);
        current = item;
      }
    });
  };
  pathSnippets.forEach((item, index) => {
    if (index !== 0) {
      findName(current, item);
    }
  });
  document.title = nameArr[nameArr.length - 1];
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        {index === nameArr.length - 1 ? (
          <>{nameArr[index]}</>
        ) : (
          <Link to={url} className={`hover:bg-blue-600 hover:text-white`}>
            {nameArr[index]}
          </Link>
        )}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/" className={`hover:bg-blue-600 hover:text-white`}>
        首页
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/profile">个人中心</Link>,
    },
    {
      key: '2',
      label: <a onClick={clearValue}>退出</a>,
    },
  ];
  return (
    <Layout>
      {/* className={`theme-solar`} */}
      <Sider collapsed={collapsed}>
        <Menu mode="inline" items={menus} theme="dark" />
      </Sider>
      <Layout className={`h-screen bg-white`}>
        <Header
          className={`bg-white !important p-0 flex items-center justify-between border-solid border-0 border-b-[1px] border-slate-100`}
        >
          <div className={`flex items-center`}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'px-[24px] transition hover:text-blue-600 duration-[150ms]',
              onClick: () => setCollapsed(!collapsed),
            })}
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </div>
          <div className={`flex w-[90px] justify-center cursor-pointer`}>
            <Dropdown trigger={['click']} menu={{ items }} placement="bottom" arrow>
              <Avatar src={account?.avatar} alt="暂无" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content
          className={`py-[24px] px-[16px] overflow-y-scroll className={'h-[calc(100%-64px)]'}`}
        >
          <React.Suspense
            fallback={
              <div className={`flex justify-center items-center h-[calc(100%-64px)]`}>加载中……</div>
            }
          >
            {account ? (
              <Outlet />
            ) : (
              <Result status="404" subTitle="对不起，您的网络似乎有些问题！" />
            )}
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
export default Index;
