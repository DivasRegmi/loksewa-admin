import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userId: null,
  token: "",
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = "";
      state.userId = null;
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const selectUser = (state) => {
  return state.user;
};

export const {
 login,
 logout
} = userSlice.actions;

export default userSlice.reducer;
