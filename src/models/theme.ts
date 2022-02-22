import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import ThemeDao from '@/config/themeDao';
import {ThemeFlags} from '@/assets/theme';

const themeDao = new ThemeDao();

export interface ThemeState {
  themeColor: string;
  modalVisible: boolean;
}

const initialState: ThemeState = {
  themeColor: ThemeFlags.Default,
  modalVisible: false,
};

export const onChangeTheme = createAsyncThunk(
  'theme/onChangeTheme',
  async (params: {color: string}) => {
    await themeDao.save(params.color);
    return {color: params.color};
  },
);

export const getThemeColor = createAsyncThunk(
  'theme/getThemeColor',
  async () => {
    const color = await themeDao.getTheme();
    return {
      color,
    };
  },
);

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setModalVisible(state, {payload}: PayloadAction<{isShow: boolean}>) {
      console.log('payload => ', payload);
      state.modalVisible = payload.isShow;
    },
  },
  extraReducers: builder => {
    builder.addCase(onChangeTheme.fulfilled, (state, {payload}) => {
      state.themeColor = payload.color;
      state.modalVisible = false;
    });

    builder.addCase(getThemeColor.fulfilled, (state, {payload}) => {
      state.themeColor = payload.color;
    });
  },
});

// Action creators are generated for each case reducer function
export const {setModalVisible} = themeSlice.actions;

export default themeSlice.reducer;
