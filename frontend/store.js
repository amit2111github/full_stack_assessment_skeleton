import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import homeReducer from './slice/homeSlice';
import modalReducer from './slice/modalSlice';
import pageReducer from './slice/pageSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
    modal: modalReducer,
    page: pageReducer,
  },
});

export default store;
