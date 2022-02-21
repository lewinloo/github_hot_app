import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector, useMounted} from '@/utils/hooks';
import {onLoadMorePopularData, onLoadPopularData} from '@/models/popular';
import PopularItemComp from './PopularItem';
import {PopularItemProps} from '@/config/interfaces';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigation} from '@/navigator';
import FavoritDao from '@/config/favoriteDao';
import {onFavorite, to} from '@/utils';

enum API {
  URL = 'https://api.github.com/search/repositories?q=',
  QUERY_STR = '&sort=stars', // 按照点赞排序
}

export const favoriteDao = new FavoritDao('popular');

function PopularScreen(props: any) {
  const dispatch = useAppDispatch();
  const popular = useAppSelector(s => s.popular);
  const theme = useAppSelector(s => s.theme);
  const [storeName, setStoreName] = useState(props.route.name);
  const {navigate} = useNavigation<RootStackNavigation>();

  const loadData = async () => {
    const url = generateUrl(storeName);
    await to(dispatch(onLoadPopularData({storeName, url, favoriteDao})));
  };

  useMounted(() => {
    setStoreName(props.route.name);
    loadData();
  });

  const generateUrl = (keyword: string) => {
    return API.URL + keyword + API.QUERY_STR;
  };

  const handleSelect = useCallback(
    (item: PopularItemProps) => {
      navigate('Details', {projectModel: item.item});
    },
    [navigate],
  );

  const handleFavorite = useCallback(
    (item: PopularItemProps, isFavorite?: boolean) => {
      onFavorite(favoriteDao, item.item, isFavorite!, 'popular');
    },
    [],
  );

  const renderItem = useCallback(
    ({item}: {item: PopularItemProps}) => {
      return (
        <PopularItemComp
          item={item!}
          onSelect={handleSelect}
          onFavorite={handleFavorite}
        />
      );
    },
    [handleSelect, handleFavorite],
  );

  const keyExtractor = useCallback((item: any) => item.item.id, []);

  const handleEndReached = useCallback(() => {
    const hasMore = popular[storeName]?.hasMore;
    const loadMoreLoading = popular[storeName]?.loadMoreLoading;

    if (loadMoreLoading || !hasMore) {
      return;
    }
    dispatch(
      onLoadMorePopularData({storeName, page: popular[storeName].page! + 1}),
    );
  }, [dispatch, popular, storeName]);

  const renderFooter = useCallback(() => {
    const hasMore = popular[storeName]?.hasMore;
    if (!hasMore && !popular[storeName]?.isLoading) {
      return (
        <View style={styles.end}>
          <Text>没有更多啦～</Text>
        </View>
      );
    }

    if (
      popular[storeName]?.loadMoreLoading &&
      hasMore &&
      popular[storeName]?.projectModels!.length > 0
    ) {
      return (
        <View style={styles.end}>
          <ActivityIndicator />
        </View>
      );
    }
    return null;
  }, [popular, storeName]);

  return (
    <View style={styles.container}>
      <FlatList
        data={popular[storeName]?.projectModels ?? []}
        style={styles.flatList}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            title="加载中..."
            titleColor={theme.themeColor}
            refreshing={popular[storeName]?.isLoading}
            onRefresh={loadData}
            tintColor={theme.themeColor}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  flatList: {
    marginTop: 5,
  },
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default memo(PopularScreen);
