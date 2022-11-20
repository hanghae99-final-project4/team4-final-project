import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userReducer";
// import { messageSlice } from "./messageReducer";
// import { workSpaceSlice } from "./workSpaceReducer";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
