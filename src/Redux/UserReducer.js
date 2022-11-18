import { createSlice } from "@reduxjs/toolkit";
// import Mask_basic from "../public/img/avatar/Mask_basic.png";

const initialState = {
  user_name: "",
  user_email: "",
  workSpaceList: [],
  invitation: [],
  profile_image_url: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    login: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
    userLogout: () => initialState,
    getUserInfo: (state, action) => {
      state.value = action.payload;
    },
    removeInvitation: (state, action) => {
      state.value = {
        ...action.payload,
      };
    },
    changeAvatar: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {
  login,
  userLogout,
  getUserInfo,
  removeInvitation,
  changeAvatar,
} = userSlice.actions;

export default userSlice.reducer;
