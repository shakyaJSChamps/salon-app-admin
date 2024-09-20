import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    data: [],
    searchTerm: '', 
  },
  reducers: {
    setCountries: (state, action) => {
      state.data = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCountries, setSearchTerm } = countriesSlice.actions;
export const selectCountriesData = (state) => state.countries.data;
export const selectSearchTerm = (state) => state.countries.searchTerm;

export default countriesSlice.reducer;
