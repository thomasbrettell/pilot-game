import { configureStore } from '@reduxjs/toolkit';
import userReduce from './user-slice';

const store = configureStore({
  reducer: {
    user: userReduce,
  },
});

export default store;
