import { configureStore } from '@reduxjs/toolkit'
import  authInfoReducer  from '../features/authInfo'
export default configureStore({
  reducer: {
    authInfo : authInfoReducer,
  },
})