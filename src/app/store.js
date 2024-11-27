import { configureStore } from '@reduxjs/toolkit';

import userAuthReducer from './features/users/authSlice';
import currencyReducer from './features/users/currencySlice';


const store = configureStore({
   reducer: {
      userAuth: userAuthReducer,
      currency: currencyReducer
   },
});

export default store;