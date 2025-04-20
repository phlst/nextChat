import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  $id: string;
  name: string;
  email: string;
  avatar_url: string;
  isAuthenticated: boolean;
};

const initialState: User = {
  $id: '',
  name: '',
  email: '',
  avatar_url: '',
  isAuthenticated: false,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar_url = action.payload.avatar_url;
      state.$id = action.payload.$id;
    },
    clearUser: (state) => {
      state.name = '';
      state.$id = '';
      state.isAuthenticated = false;
      state.avatar_url = '';
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
