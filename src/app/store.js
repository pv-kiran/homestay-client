import { configureStore } from '@reduxjs/toolkit';

import userAuthReducer from './features/users/authSlice';

const store = configureStore({
   reducer: {
      userAuth: userAuthReducer
   },
});

export default store;