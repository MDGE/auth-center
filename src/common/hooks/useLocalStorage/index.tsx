import { useState } from 'react';
const useLocalStorage = (name: string) => {
  const [, setState] = useState({});
  const currentValue = localStorage.getItem(name);
  const setValue = (key: string, val: string) => {
    localStorage.setItem(key, val);
    setState({});
  };
  const clearValue = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setState({});
  };
  return [currentValue, setValue, clearValue] as const;
};
export default useLocalStorage;
