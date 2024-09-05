import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleOpen: (state) => {
      return !state;
    },
  },
});

export const { handleOpen } = modalSlice.actions;

export default modalSlice.reducer;
