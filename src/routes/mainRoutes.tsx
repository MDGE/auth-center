import React from 'react';

const Home = React.lazy(() => import('pages/home'));
const ListPage = React.lazy(() => import('pages/list-page'));
const Jotai = React.lazy(() => import('pages/my-jotai'));
const Zustand = React.lazy(() => import('pages/my-zustand'));
const Input = React.lazy(() => import('pages/ui-manage/input'));
const CarConvertRate = React.lazy(() => import('pages/list-page/car-convert-rate'));
const Profile = React.lazy(() => import('pages/profile'));
const Table = React.lazy(() => import('pages/ui-manage/table'));
const mainRoutes = [
  {
    index: true,
    name: '首页',
    element: <Home />,
  },
  {
    path: 'profile',
    name: '个人中心',
    element: <Profile />,
  },
  {
    path: 'config',
    name: '列表配置',
    children: [
      {
        index: true,
        element: <ListPage />,
      },
      {
        path: 'list',
        name: '列表界面',
        element: <ListPage />,
      },
    ],
  },
  {
    path: 'state',
    name: '状态管理',
    children: [
      {
        index: true,
        element: <Jotai />,
      },
      {
        path: 'jotai',
        name: '组件内状态',
        element: <Jotai />,
      },
      {
        path: 'zustand',
        name: '组件外状态',
        element: <Zustand />,
      },
    ],
  },
  {
    path: 'components',
    name: '组件管理',
    children: [
      {
        index: true,
        element: <Input />,
      },
      {
        path: 'input',
        name: '输入搜索',
        element: <Input />,
      },
      {
        path: 'table',
        name: '表格展示',
        element: <Table />,
      },
    ],
  },
  {
    path: 'car',
    name: '汽车',
    element: <CarConvertRate />,
  },
];
export default mainRoutes;
