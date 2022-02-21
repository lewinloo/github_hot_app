import {configureStore} from '@reduxjs/toolkit';
import theme from '@/models/theme';
import popular from '@/models/popular';
import trending from '@/models/trending';

export const store = configureStore({
  reducer: {
    theme,
    popular,
    trending,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
