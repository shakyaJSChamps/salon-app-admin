import { createSlice } from '@reduxjs/toolkit'
import Session from '../service/session';
export const authInfo = createSlice({
  name: 'token',
  initialState: {
    token: Session.get('token') || "",
    userInfo:Session.get('userInfo') || ""
  },
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload.token;
      state.userInfo = JSON.stringify(action.payload.userInfo);
      Session.set("token", action.payload.token);
      Session.set("userInfo", JSON.stringify(action.payload.userInfo));
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