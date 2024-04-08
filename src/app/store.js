import { configureStore } from "@reduxjs/toolkit";
import authInfoReducer from "../features/authInfo";
import countriesReducer from "../features/countriesInfo";
import featureReducer from "../features/feature";
import saloonTypesReducer from "../features/saloonTypeSlice";
import userReducer from "../features/userInfoSlice";

export default configureStore({
  reducer: {
    authInfo: authInfoReducer,
    countries: countriesReducer,
    feature: featureReducer,
    saloonTypes: saloonTypesReducer,
    user: userReducer,
  },
});
