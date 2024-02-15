import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSaloon } from '../api/account.api';

export const fetchSaloonTypes = createAsyncThunk(
  'saloonTypes/fetchSaloonTypes',
  async () => {
    const response = await getSaloon();
    console.log("Respo :: ::>", response);
    return response.data;
  }
  );
  // console.log("respose data ::::>", response.data);

const saloonTypesSlice = createSlice({
  name: 'saloonTypes',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaloonTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSaloonTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSaloonTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default saloonTypesSlice.reducer;
