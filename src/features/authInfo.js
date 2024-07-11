import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authInfo = createSlice({
  name: 'token',
  initialState: {
    token: Session.get('token') || "",
    // userInfo: {},
    userInfo:Session.get('userInfo') || ""
  },
  reducers: {
    storeToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.token = action.payload.token;
      state.userInfo = JSON.stringify(action.payload.userInfo);
      Session.set("token", action.payload.token);
      Session.set("userInfo", JSON.stringify(action.payload.userInfo));
      console.log("UserInfo stored:", action.payload.userInfo);
    },
    removeToken: (state)=>{
      Session.remove("token");
      state.token = "";
      state.userInfo = {};
      Session.remove("userInfo");
    }
  },
})

// Action creators are generated for each case reducer function
export const { storeToken, removeToken } = authInfo.actions;

export default authInfo.reducer;