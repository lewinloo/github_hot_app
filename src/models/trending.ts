import FavoritDao from '@/config/favoriteDao';
import {TrendingItemProps} from '@/config/interfaces';
import {delay, wrapProjectModels} from '@/utils';
import {useFetch} from '@/utils/hooks';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export interface TrendingState {
  [key: string]: {
    items: TrendingItemProps[];
    projectModels?: TrendingItemProps[];
    page?: number;
    error?: any;
    hasMore?: boolean;
    isLoading: boolean;
    loadMoreLoading: boolean;
  };
}

const initialState: TrendingState = {};

/**
 * 加载趋势模块的数据
 */
export const onLoadTrendingData = createAsyncThunk(
  'trending/onLoadTrendingData',
  async (
    params: {storeName: string; url: string; favoriteDao: FavoritDao},
    {dispatch},
  ) => {
    dispatch(initData({storeName: params.storeName}));
    const dataStore = useFetch();
    const res = await dataStore.fetchData(params.url!, 'trending');
    const wrapItems = await wrapProjectModels(
      res.data,
      params.favoriteDao,
      'trending',
    );
    return {
      storeName: params.storeName,
      items: wrapItems,
    };
  },
);

/**
 * 加载更多
 */
export const onLoadMoreTrendingData = createAsyncThunk(
  'trending/onLoadMoreTrendingData',
  async (params: {storeName: string; page: number}, {dispatch}) => {
    dispatch(
      setLoadMoreLoading({loadMoreLoading: true, storeName: params.storeName}),
    );
    await delay(1500);
    dispatch(loadMore({page: params.page, storeName: params.storeName}));
  },
);

export const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    // 初始化一下数据
    initData(state, action: PayloadAction<{storeName: string}>) {
      let items: TrendingItemProps[];
      if (state[action.payload.storeName]) {
        items = state[action.payload.storeName].items;
      } else {
        items = [];
      }
      state[action.payload.storeName] = {
        items,
        projectModels: items.slice(0, 10),
        isLoading: true,
        loadMoreLoading: false,
        hasMore: true,
        page: 1,
      };
    },
    // 设置加载更多的loading
    setLoadMoreLoading(
      state,
      {payload}: PayloadAction<{loadMoreLoading: boolean; storeName: string}>,
    ) {
      state[payload.storeName].loadMoreLoading = payload.loadMoreLoading;
    },
    // 加载更多的数据
    loadMore(
      state,
      {payload}: PayloadAction<{page: number; storeName: string}>,
    ) {
      const {page, storeName} = payload;
      const items = state[storeName].items;

      if (page > items.length / 10) {
        state[storeName].projectModels = items;
        state[storeName].page = items.length / 10;
        state[storeName].loadMoreLoading = false;
        state[storeName].hasMore = false;
        return;
      }
      let pageIndex = page - 1;
      const originData = state[storeName].projectModels;
      state[storeName].projectModels = originData?.concat(
        items.slice(pageIndex * 10, page * 10),
      );
      state[storeName].page = page;
      state[storeName].hasMore = true;
      state[storeName].loadMoreLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(onLoadTrendingData.fulfilled, (state, {payload}) => {
      state[payload.storeName].items = payload.items;
      console.log('trending => ', payload.items);

      state[payload.storeName].projectModels = payload.items.slice(0, 10);
      state[payload.storeName].isLoading = false;
    });
  },
});

export const {initData, loadMore, setLoadMoreLoading} = trendingSlice.actions;

export default trendingSlice.reducer;
