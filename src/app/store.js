import { configureStore } from '@reduxjs/toolkit';

import userAuthReducer from './features/users/authSlice';
import currencyReducer from './features/users/currencySlice';
import addOnsReducer from "./features/admin/addonSlice"

const store = configureStore({
   reducer: {
      userAuth: userAuthReducer,
      currency: currencyReducer,
      addOns: addOnsReducer
   },
});

export default store;