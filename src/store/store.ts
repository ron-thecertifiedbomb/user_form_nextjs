import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../pages/api/apiSlice';
import counterReducer, { CounterState } from './reducer';

export interface AppState {
  counter: CounterState;
}

const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export default store;