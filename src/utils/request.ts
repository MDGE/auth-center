import axios from 'axios';

const baseURL = 'http://localhost:4614';
const httpAgent = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    device: 'pc',
  },
});
axios.defaults.withCredentials = true;
httpAgent.interceptors.request.use(
  (config: { headers: { token: string | null } }) => {
    config.headers.token = localStorage.getItem('token');
    return config;
  },
  (error: unknown) => Promise.reject(error),
);
httpAgent.interceptors.response.use(
  (response: { data: unknown }) => response.data,
  (error: unknown) => {
    Promise.reject(error);
  },
);
export const http = (method: string, url: string, data: object, headers?: string) => {
  return httpAgent({ method, url, data, headers: { 'Content-Type': headers } });
};
export const get = (url: string, data?: object) => {
  return httpAgent.get(url, data);
};
export const post = (url: string, data?: object, headers = 'application/json') => {
  return httpAgent({ method: 'post', url, data, headers: { 'Content-Type': headers } });
};
