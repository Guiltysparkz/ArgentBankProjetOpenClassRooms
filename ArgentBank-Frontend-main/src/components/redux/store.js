import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import formVisibilityReducer from './formVisibilityReducer'; // Import the new reducer
import accountsReducer from './accountsReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    formVisibility: formVisibilityReducer, // Add the form visibility reducer
  },
});
