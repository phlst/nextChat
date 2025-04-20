import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  $id: string;
  name: string;
  email: string;
};

type InitialState = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
};

const initialState: InitialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
