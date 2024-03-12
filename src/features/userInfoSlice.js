import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [], 
    searchTerm: '',
    // totalItems: 20,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setData, setSearchTerm } = userSlice.actions;
export const selectUserData = (state) => state.user.data;
export const selectSearchTerm = (state) => state.user.searchTerm;
// export const selectTotalItems = (state) => state.user.totalItems;


export default userSlice.reducer;