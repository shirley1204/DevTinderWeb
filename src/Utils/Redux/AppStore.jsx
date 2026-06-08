import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./ConnectionSlice";
import requestReducer from "./RequestSlice"
 
export const AppStore = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReducer,
    connection :connectionReducer,
    requests:requestReducer
  },
});
