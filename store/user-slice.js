import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    SET_USERNAME(state, action) {
      state.username = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
