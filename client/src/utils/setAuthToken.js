import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Include 'Bearer ' prefix before the token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove the Authorization header if no token is present
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
