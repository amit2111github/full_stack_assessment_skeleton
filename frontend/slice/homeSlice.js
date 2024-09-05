import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHome: (state, action) => {
      return action.payload;
    },
    clearHome: () => {
      return initialState;
    },
  },
});

export const { setHome, clearHome } = homeSlice.actions;

export default homeSlice.reducer;
