import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectAllItems = (state: RootState) => state.shoppingList.items;
export const selectStatus = (state: RootState) => state.shoppingList.status;
export const selectError = (state: RootState) => state.shoppingList.error;
export const selectFilter = (state: RootState) => state.filter.category;

export const selectFilteredItems = createSelector(
  [selectAllItems, selectFilter],
  (items, filter) => {
    return filter === 'all'
      ? items
      : items.filter((item) => item.category === filter);
  }
);

export const selectCategories = createSelector(
  [selectAllItems],
  (items) => Array.from(new Set(items.map((item) => item.category)))
);