import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  _id: string;
  name: string;
  username: string;
  gender?: string;
  age?: number;
  about?: string;
  email: string;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
export interface UserSlice {
  userInfo: UserInfo | null;
}

const initialState: UserSlice = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      state.userInfo = action.payload;
    },
    clearUserStore: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, clearUserStore } = userSlice.actions;

export default userSlice.reducer;
