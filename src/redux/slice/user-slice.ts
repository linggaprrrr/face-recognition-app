import { createSlice } from '@reduxjs/toolkit';

const initialState: User.UserResponse = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  picture: '',
  created_at: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: { payload: User.UserResponse }) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
