import { createSlice } from "@reduxjs/toolkit";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    value: [], 
  },
  reducers: {
    setFeature: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFeature } = featureSlice.actions;

export default featureSlice.reducer;
