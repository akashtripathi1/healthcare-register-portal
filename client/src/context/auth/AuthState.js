import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
// import { jwtDecode } from 'jwt-decode';



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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
    aadhaar: null,
    aadhaarAuth: false
  };
  // axios.defaults.baseURL = 'http://localhost:5000';

  if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://limitless-tor-92113-f49db8bf78f3.herokuapp.com';
} else {
    axios.defaults.baseURL = 'http://localhost:5000';
}


  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if(localStorage.token){

      setAuthToken(localStorage.token);
    }

    try {

      const res = await axios.get('/api/users/user');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      // dispatch({ type: AUTH_ERROR });
      console.log('load hai')
    }
  };

  // Set aadhaar number 
  const setAadhaarNumber = (number) => {
    dispatch({
      type: SET_AADHAAR_NUMBER,
      payload: number
    });
  };

  // SET Aadhaar auth
  const setAadhaarAuth = (status) => {
    dispatch({
      type: SET_AADHAAR_AUTH,
      payload: status
    });
  };
  
  

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/register', formData, config);

      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth/login', formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      // console.log('login error')
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => {window.location.reload(); dispatch({ 
    type: LOGOUT 
  });}

  // Clear Errors
  const clearErrors = () => dispatch({ 
    type: CLEAR_ERRORS 
  });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        aadhaar: state.aadhaar,
        aadhaarAuth: state.aadhaarAuth,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        setAadhaarNumber,
        setAadhaarAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;