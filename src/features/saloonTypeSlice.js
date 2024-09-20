import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSalon } from '../api/account.api';

export const fetchSalonTypes = createAsyncThunk(
  'salonTypes/fetchSalonTypes',
  async () => {
    const response = await getSalon();
    console.log("Respo :: ::>", response);
    return response.data;
  }
  );

const salonTypesSlice = createSlice({
  name: 'salonTypes',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalonTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalonTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSalonTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default salonTypesSlice.reducer;
