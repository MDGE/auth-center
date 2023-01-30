export interface InputSearchAbortRes {
  errorCode: number;
  message: string;
  data: Data;
}

export interface Data {
  pageInfo: PageInfo;
  list: List[];
}

export interface List {
  brand: Brand;
}

export interface Brand {
  id: number;
  abbr: string;
  name: string;
  note: null | string;
  active: boolean;
}

export interface PageInfo {
  totalItem: number;
  totalPage: number;
  pageSize: number;
  currentPage: number;
}

export interface Params {
  page: number;
  pageSize: number;
  keyword?: string;
  signal?: AbortController;
}
type FieldNames = {
  label: string;
  value: string;
};
export type InputSearchAbortProps = {
  fieldNames?: FieldNames;
};
