import React from 'react';
import { RouteObject } from 'react-router-dom';
import mainRoutes from './mainRoutes';
const Layout = React.lazy(() => import('common/layout'));
const NotFound = React.lazy(() => import('pages/not-found'));
const Login = React.lazy(() => import('pages/login'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [...mainRoutes],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
export default routes;
