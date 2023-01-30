import { NavLink } from 'react-router-dom';
import type { MenuProps } from 'antd';
import Icon from 'common/icon';
type MenuItem = Required<MenuProps>['items'][number];
const menus: MenuItem[] = [
  {
    label: <NavLink to="/">首页</NavLink>,
    key: '1',
    icon: <Icon className="icon-shouye" />,
  },
  {
    label: '列表配置',
    key: '2',
    icon: <Icon className="icon-liebiao" />,
    children: [
      {
        label: <NavLink to="/config/list">列表界面</NavLink>,
        icon: <Icon className="icon-liebiao" />,
        key: '21',
      },
    ],
  },
  {
    label: '状态管理',
    key: '3',
    icon: <Icon className="icon-zhuangtai" />,
    children: [
      {
        label: <NavLink to="/state/jotai">jotail</NavLink>,
        icon: <Icon className="icon-liebiao" />,
        key: '31',
      },
      {
        label: <NavLink to="/state/zustand">zustand</NavLink>,
        icon: <Icon className="icon-liebiao" />,
        key: '32',
      },
    ],
  },
  {
    label: '组建管理',
    key: '4',
    icon: <Icon className="icon-a-zujianguanli" />,
    children: [
      {
        label: <NavLink to="/components/input">输入搜索</NavLink>,
        icon: <Icon className="icon-liebiao" />,
        key: '41',
      },
      {
        label: <NavLink to="/components/table">表格展示</NavLink>,
        icon: <Icon className="icon-liebiao" />,
        key: '42',
      },
    ],
  },
  {
    label: <NavLink to="/car">汽车油电折算比</NavLink>,
    icon: <Icon className="icon-liebiao" />,
    key: '5',
  },
];
export default menus;
