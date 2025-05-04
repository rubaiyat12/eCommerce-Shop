import { configureStore } from '@reduxjs/toolkit';
import favoriteReducer from './favoriteSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
