import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userProfile: null,
    token: "",
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
  },
});

export const { setAuthUser, setUserProfile, setToken, setShippingAddress } =
  authSlice.actions;
export default authSlice.reducer;
