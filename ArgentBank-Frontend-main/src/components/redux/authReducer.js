import {
  GET_LOGIN,
  CHECK_AUTH,
  EDIT_USERNAME,
  UPDATE_USERNAME,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_FAILURE,
} from './authActions';
import { initialStates } from './initialStates';

export default function authReducer(state = initialStates.auth, action) {
  switch (action.type) {
    case CHECK_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
        isLoading: false,
      };
    case CHECK_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        firstName: action.payload.firstName || null,
        lastName: action.payload.lastName || null,
        userName: action.payload.userName || null,
        isLoading: false, // Stop loading after authentication check
      };
    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };
    case 'END_LOADING':
      return {
        ...state,
        isLoading: false, // Ensure loading ends after API request
      };
    case EDIT_USERNAME:
    case UPDATE_USERNAME:
      return {
        ...state,
        userName: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        firstName: null,
        lastName: null,
        userName: null,
      };
    default:
      return state;
  }
}
