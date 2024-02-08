import { createSlice } from '@reduxjs/toolkit';

const serviceTypeSlice = createSlice({
  name: 'serviceType',
  initialState: {
    data: [], // Initial state is an empty array
  },
  reducers: {
    setServiceType: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setServiceType } = serviceTypeSlice.actions;
export const selectServiceTypeData = (state) => state.serviceType.data;

export default serviceTypeSlice.reducer;
