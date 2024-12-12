import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Item, ItemFormData } from '../../types';
import { loadItems, saveItems } from '../../utils/localStorage';

interface ShoppingListState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShoppingListState = {
  items: [],
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchItems = createAsyncThunk(
  'shoppingList/fetchItems',
  async () => {
    return loadItems();
  }
);

export const saveItemsToStorage = createAsyncThunk(
  'shoppingList/saveItems',
  async (items: Item[]) => {
    saveItems(items);
    return items;
  }
);

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemFormData>) => {
      const now = new Date().toISOString();
      const newItem: Item = {
        id: crypto.randomUUID(),
        ...action.payload,
        purchased: false,
        createdAt: now,
        updatedAt: now,
      };
      state.items.push(newItem);
      saveItems(state.items);
    },
    editItem: (state, action: PayloadAction<{ id: string; data: ItemFormData }>) => {
      const { id, data } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id
          ? { ...item, ...data, updatedAt: new Date().toISOString() }
          : item
      );
      saveItems(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveItems(state.items);
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, purchased: !item.purchased, updatedAt: new Date().toISOString() }
          : item
      );
      saveItems(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch items';
      });
  },
});

export const { addItem, editItem, removeItem, togglePurchased } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;