import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
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
export const accountAtom = atomWithImmer<Data | null>(null);

export const jAtom = atomWithImmer({ name: 'jotai', age: 27 });
