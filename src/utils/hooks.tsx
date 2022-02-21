import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '@/config/store';
import {useEffect} from 'react';
import DataStore from '@/config/localStorage';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * 组件挂载完毕钩子
 * @param fn
 */
export function useMounted(fn: () => void) {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/*
 * 离线缓存的钩子
 * @returns
 */
export function useFetch() {
  const dataStore = new DataStore();
  return dataStore;
}
