import { useCallback, useRef, useEffect } from 'react';

export const useMounted = () => {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return get;
};
