import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  loginInfo: {},
  signal: true,
};

export const loginSlice = createSlice({
  name: "Login Info",
  initialState,
  reducers: {
    loginStatus: (state, action) => {
      state.status = action.payload;
    },
    loginData: (state, action) => {
      state.loginInfo = action.payload;
    },
    loginSignal: (state, action) => {
      state.signal = action.payload;
    },
  },
});

export const { loginStatus, loginData, loginSignal } = loginSlice.actions;

export default loginSlice.reducer;
