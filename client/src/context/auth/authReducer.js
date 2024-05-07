import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  SET_AADHAAR_NUMBER,
  SET_AADHAAR_AUTH
} from '../types';

const authreducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case SET_AADHAAR_NUMBER: // Handle setting Aadhaar number
      return {
        ...state,
        aadhaar: action.payload
      };
    case SET_AADHAAR_AUTH:
      return {
        ...state,
        aadhaarAuth: action.payload // Set Aadhaar authentication status
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        // token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        // token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      console.log('register fail')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      console.log('auth error')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      console.log('login fail')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('token');
      console.log('Logout done!')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        aadhaar: null
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default authreducer;