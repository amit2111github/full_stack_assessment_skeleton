import { createSlice } from '@reduxjs/toolkit';

const initialState = 1;

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    nextPage: (state) => {
      return state + 1;
    },
    prevPage: (state) => {
      return Math.max(0, state - 1);
    },
  },
});

export const { nextPage, prevPage } = pageSlice.actions;

export default pageSlice.reducer;
