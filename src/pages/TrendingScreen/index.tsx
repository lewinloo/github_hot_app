import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {TrendingItemProps} from '@/config/interfaces';
import {onLoadTrendingData, onLoadMoreTrendingData} from '@/models/trending';
import {useAppDispatch, useAppSelector} from '@/utils/hooks';
import TrendingItem from './TrendingItem';
import {TimeSpan} from './TrendingDialog';
import {RootStackNavigation} from '@/navigator';

interface IProps {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
  timeSpan: TimeSpan;
}

enum API {
  URL = 'https://github.com/trending/',
}

function TrendingScreen(props: IProps) {
  const dispatch = useAppDispatch();
  const trending = useAppSelector(s => s.trending);
  const theme = useAppSelector(s => s.theme);
  const {navigate} = useNavigation<RootStackNavigation>();
  const storeName = props.route.name;

  const generateUrl = useCallback(
    (keyword: string) => {
      return API.URL + keyword + '?' + props.timeSpan.searchText;
    },
    [props.timeSpan],
  );

  const loadData = useCallback(async () => {
    try {
      const url = generateUrl(storeName);
      await dispatch(onLoadTrendingData({storeName, url}));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, storeName, generateUrl]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelect = useCallback(
    (item: TrendingItemProps) => {
      navigate('Details', {
        projectModel: item,
      });
    },
    [navigate],
  );

  const renderItem = useCallback(
    ({item}: {item: TrendingItemProps}) => {
      return <TrendingItem item={item} onSelect={handleSelect} />;
    },
    [handleSelect],
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  const handleEndReached = useCallback(() => {
    const hasMore = trending[storeName]?.hasMore;
    const loadMoreLoading = trending[storeName]?.loadMoreLoading;

    if (loadMoreLoading || !hasMore) {
      return;
    }
    dispatch(
      onLoadMoreTrendingData({storeName, page: trending[storeName].page! + 1}),
    );
  }, [dispatch, trending, storeName]);

  const renderFooter = useCallback(() => {
    const hasMore = trending[storeName]?.hasMore;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>没有更多啦～</Text>
        </View>
      );
    }

    if (
      trending[storeName]?.loadMoreLoading &&
      hasMore &&
      trending[storeName]?.projectModels!.length > 0
    ) {
      return (
        <View style={styles.end}>
          <ActivityIndicator />
        </View>
      );
    }
    return null;
  }, [trending, storeName]);

  return (
    <View style={styles.container}>
      <FlatList
        data={trending[storeName]?.projectModels}
        renderItem={renderItem}
        style={styles.flatList}
        ListFooterComponent={renderFooter}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            title="加载中..."
            titleColor={theme.themeColor}
            refreshing={trending[storeName]?.isLoading}
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

export default memo(TrendingScreen);
