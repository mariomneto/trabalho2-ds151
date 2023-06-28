import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../model/User';

const initialState: Partial<User> = {};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: state => {
      state = {};
    },
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
});

export const { resetUser, setUser } = user.actions;

export default user.reducer;
