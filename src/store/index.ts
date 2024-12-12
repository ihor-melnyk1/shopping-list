import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from './slices/shoppingListSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    filter: filterReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;