import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
  $id: '',
  name: '',
  email: '',
  avatar_url: '',
  friends: [],
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
      state.$id = action.payload.$id;
      state.friends = action.payload.friends;
    },
    clearUser: (state) => {
      state.name = '';
      state.$id = '';

      state.avatar_url = '';
      state.email = '';
      state.friends = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
