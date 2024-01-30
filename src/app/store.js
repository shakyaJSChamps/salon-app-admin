import { configureStore } from '@reduxjs/toolkit';
import  authInfoReducer  from '../features/authInfo';
import countriesReducer from '../features/countriesInfo';

export default configureStore({
  reducer: {
    authInfo : authInfoReducer,
    countries: countriesReducer,
  },
})