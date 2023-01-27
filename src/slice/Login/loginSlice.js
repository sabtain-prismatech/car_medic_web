import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginInfo: {},
  signal: true,
};

export const loginSlice = createSlice({
  name: "Login Info",
  initialState,
  reducers: {
    loginData: (state, action) => {
      state.loginInfo = action.payload;
    },
    loginSignal: (state, action) => {
      state.signal = action.payload;
    },
  },
});

export const { loginData, loginSignal } = loginSlice.actions;

export default loginSlice.reducer;
