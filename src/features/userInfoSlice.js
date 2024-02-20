// features/userInfoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../api/account.api";
import Notify from "../utils/notify";

export const fetchUser = createAsyncThunk(
  "userInfo/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      console.log("API Response:", response); 
      return response.data.data.items;
    } catch (error) {
      Notify.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectUserData = (state) => state.userInfo.data; // Export selectUserData selector

export default userInfoSlice.reducer;
