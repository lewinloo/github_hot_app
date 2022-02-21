import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '@/config/store';
import React, {useCallback, useEffect, useState} from 'react';
import DataStore from '@/config/localStorage';
import {Button} from '@/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useToast} from 'react-native-toast-notifications';

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

/**
 * 收藏按钮业务 hooks
 */
export function useFavoriteButton(
  item: any,
  onFavorite: (item: any, isFavorite: boolean) => void,
) {
  const theme = useAppSelector(s => s.theme);
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);

  const handleStar = useCallback(() => {
    !isFavorite && toast.show('收藏成功');
    isFavorite && toast.show('取消收藏');
    setIsFavorite(!isFavorite);
    onFavorite?.(item, !isFavorite);
  }, [isFavorite, toast, item, onFavorite]);

  const renderStar = (
    <Button onPress={handleStar}>
      <Icon
        name={isFavorite ? 'star' : 'star-outline'}
        size={26}
        style={{color: theme.themeColor}}
      />
    </Button>
  );

  return {FavoriteButton: renderStar};
}
