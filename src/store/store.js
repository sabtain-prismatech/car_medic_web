import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@slice/Login/loginSlice";

export const store = configureStore({
  reducer: {
    loginInfo: loginReducer,
  },
});
