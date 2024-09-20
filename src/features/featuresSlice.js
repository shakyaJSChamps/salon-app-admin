import { createSlice } from "@reduxjs/toolkit";
import Session from "../service/session";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    value: JSON.parse(Session.get("feature")) || [],
  },
  reducers: {
    setFeature: (state, action) => {
      state.value = action.payload;
      Session.set("feature", JSON.stringify(action.payload));
    },
  },
});

export const { setFeature } = featureSlice.actions;
export default featureSlice.reducer;