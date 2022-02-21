import FavoritDao from '@/config/favoriteDao';
import {PopularItemProps} from '@/config/interfaces';
import {delay, wrapProjectModels} from '@/utils';
import {useFetch} from '@/utils/hooks';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export interface PopularState {
  [key: string]: {
    items: PopularItemProps[];
    projectModels?: PopularItemProps[];
    page?: number;
    error?: any;
    hasMore?: boolean;
    isLoading: boolean;
    loadMoreLoading: boolean;
  };
}

const initialState: PopularState = {};

/**
 * 加载最热模块的数据
 */
export const onLoadPopularData = createAsyncThunk(
  'popular/onLoadPopularData',
  async (
    params: {storeName: string; url: string; favoriteDao: FavoritDao},
    {dispatch},
  ) => {
    dispatch(initData({storeName: params.storeName}));
    await delay(1000);
    const dataStore = useFetch();
    const res = await dataStore.fetchData(params.url!, 'popular');
    const wrapItems = await wrapProjectModels(
      res.data.items,
      params.favoriteDao,
      'popular',
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
export const onLoadMorePopularData = createAsyncThunk(
  'popular/onLoadMorePopularData',
  async (params: {storeName: string; page: number}, {dispatch}) => {
    dispatch(
      setLoadMoreLoading({loadMoreLoading: true, storeName: params.storeName}),
    );
    await delay(1500);
    dispatch(loadMore({page: params.page, storeName: params.storeName}));
  },
);

export const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    // 初始化一下数据
    initData(state, action: PayloadAction<{storeName: string}>) {
      let items: PopularItemProps[];
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
        hasMore: items.slice(0, 10).length < items.length,
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
  // 建议使用这种方式写，遇到过坑
  extraReducers: builder => {
    builder.addCase(onLoadPopularData.fulfilled, (state, {payload}) => {
      state[payload.storeName].items = payload.items;
      state[payload.storeName].projectModels = payload.items.slice(0, 10);
      state[payload.storeName].isLoading = false;
    });
  },
});

export const {initData, loadMore, setLoadMoreLoading} = popularSlice.actions;

export default popularSlice.reducer;
