import FavoritDao from '@/config/favoriteDao';
import {delay, wrapProjectModels} from '@/utils';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export interface FavoriteState {
  [key: string]: {
    items: any[];
    projectModels?: any[];
    page?: number;
    error?: any;
    hasMore?: boolean;
    isLoading: boolean;
    loadMoreLoading: boolean;
  };
}

const initialState: FavoriteState = {};

/**
 * 加载最热模块的数据
 */
export const onLoadFavoriteData = createAsyncThunk(
  'favorite/onLoadFavoriteData',
  async (
    params: {storeName: 'popular' | 'trending'; favoriteDao: FavoritDao},
    {dispatch},
  ) => {
    dispatch(initData({storeName: params.storeName}));
    await delay(1000);
    const items = (await params.favoriteDao.getAllItems()) as [];
    const wrapItems = await wrapProjectModels(
      items,
      params.favoriteDao,
      params.storeName,
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
export const onLoadMoreData = createAsyncThunk(
  'favorite/onLoadMoreData',
  async (params: {storeName: string; page: number}, {dispatch}) => {
    dispatch(
      setLoadMoreLoading({loadMoreLoading: true, storeName: params.storeName}),
    );
    await delay(1500);
    dispatch(loadMore({page: params.page, storeName: params.storeName}));
  },
);

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // 初始化一下数据
    initData(state, action: PayloadAction<{storeName: string}>) {
      let items: any[];
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
    builder.addCase(onLoadFavoriteData.fulfilled, (state, {payload}) => {
      const items = payload.items as unknown[] as any[];
      state[payload.storeName].items = items;
      state[payload.storeName].projectModels = items.slice(0, 10);
      state[payload.storeName].isLoading = false;
    });
  },
});

export const {initData, loadMore, setLoadMoreLoading} = favoriteSlice.actions;

export default favoriteSlice.reducer;
