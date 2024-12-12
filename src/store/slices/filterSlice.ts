import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  category: string;
}

const initialState: FilterState = {
  category: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;