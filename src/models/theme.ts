import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ThemeState {
  themeColor: string;
}

const initialState: ThemeState = {
  themeColor: '#0099FF',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state, {payload}: PayloadAction<{color: string}>) {
      state.themeColor = payload.color;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;
