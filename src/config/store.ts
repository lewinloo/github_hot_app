import {configureStore} from '@reduxjs/toolkit';
import theme from '@/models/theme';
import popular from '@/models/popular';
import trending from '@/models/trending';
import favorite from '@/models/favorite';

export const store = configureStore({
  reducer: {
    theme,
    popular,
    trending,
    favorite,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
