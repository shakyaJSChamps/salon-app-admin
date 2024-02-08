import { configureStore } from '@reduxjs/toolkit';
import authInfoReducer from '../features/authInfo';
import countriesReducer from '../features/countriesInfo';
import serviceTypeReducer from '../features/serviceTypeSlice';
import featureReducer from '../features/feature';

import featureReducer from '../features/featuresSlice'
export default configureStore({
  reducer: {
    authInfo : authInfoReducer,
  },
});
