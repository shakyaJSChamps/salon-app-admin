import { configureStore } from '@reduxjs/toolkit'
import  authInfoReducer  from '../features/authInfo'
import featureReducer from '../features/featuresSlice'
export default configureStore({
  reducer: {
    authInfo : authInfoReducer,
    feature: featureReducer,
  },
})