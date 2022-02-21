import FavoritDao from '@/config/favoriteDao';
import {onLoadFavoriteData, onLoadMoreData} from '@/models/favorite';
import {onFavorite} from '@/utils';
import {useAppDispatch, useAppSelector, useMounted} from '@/utils/hooks';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import React, {memo, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import PopularItemComp from '@/pages/PopularScreen/PopularItem';
import TrendingItemComp from '@/pages/TrendingScreen/TrendingItem';

interface IProps {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}

function FavoriteScreen(props: IProps) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(s => s.theme);
  const favorite = useAppSelector(s => s.favorite);
  const storeName = props.route.name as 'popular' | 'trending';
  const favoriteDao = useMemo(
    () => new FavoritDao(storeName as 'popular' | 'trending'),
    [storeName],
  );

  useMounted(() => {
    loadData();
  });

  const loadData = useCallback(async () => {
    await dispatch(
      onLoadFavoriteData({
        storeName,
        favoriteDao,
      }),
    );
  }, [dispatch, storeName, favoriteDao]);

  const handleSelect = useCallback(
    (item: any) => {
      props.navigation.navigate('Details', {projectModel: item});
    },
    [props],
  );

  const handleFavorite = useCallback(
    (item: any, isFavorite?: boolean) => {
      onFavorite(favoriteDao, item.item, isFavorite!, storeName);
    },
    [favoriteDao, storeName],
  );

  const renderItem = ({item}: {item: any}) => {
    return storeName === 'popular' ? (
      <PopularItemComp
        item={item!}
        onSelect={handleSelect}
        onFavorite={handleFavorite}
      />
    ) : (
      <TrendingItemComp
        item={item!}
        onSelect={handleSelect}
        onFavorite={handleFavorite}
      />
    );
  };

  const keyExtractor = useCallback(
    (item: any) =>
      storeName === 'popular' ? item.item.id : item.item.fullName,
    [storeName],
  );

  const handleEndReached = useCallback(() => {
    const hasMore = favorite[storeName]?.hasMore;
    const loadMoreLoading = favorite[storeName]?.loadMoreLoading;

    if (loadMoreLoading || !hasMore) {
      return;
    }
    dispatch(onLoadMoreData({storeName, page: favorite[storeName].page! + 1}));
  }, [dispatch, favorite, storeName]);

  const renderFooter = useCallback(() => {
    const hasMore = favorite[storeName]?.hasMore;
    if (!hasMore && !favorite[storeName]?.isLoading) {
      return (
        <View style={styles.end}>
          <Text>没有更多啦～</Text>
        </View>
      );
    }

    if (
      favorite[storeName]?.loadMoreLoading &&
      hasMore &&
      favorite[storeName]?.projectModels!.length > 0
    ) {
      return (
        <View style={styles.end}>
          <ActivityIndicator />
        </View>
      );
    }
    return null;
  }, [favorite, storeName]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorite[storeName]?.projectModels ?? []}
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
            refreshing={favorite[storeName]?.isLoading}
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

export default memo(FavoriteScreen);
