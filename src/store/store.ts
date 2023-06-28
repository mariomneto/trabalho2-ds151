import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { catsApi } from '../api';
import user from './slice/User';
import breeds from './slice/Breeds';
export const reducer = combineReducers({
  [catsApi.reducerPath]: catsApi.reducer,
  user,
  breeds,
});
export const store = configureStore({
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(catsApi.middleware),
  reducer,
  enhancers: defaultEnhancers => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
