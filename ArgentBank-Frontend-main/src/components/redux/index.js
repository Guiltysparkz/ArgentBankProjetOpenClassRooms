// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import accountsReducer from './accountsReducer'; // Import accountsReducer

export default combineReducers({
  auth: authReducer, // Use 'auth' as the key for authReducer
  accounts: accountsReducer, // Add accountsReducer with key 'accounts'
});
