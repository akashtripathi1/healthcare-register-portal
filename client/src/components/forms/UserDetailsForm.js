import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Paper, Typography, Button, Grid, Box, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Alerts from '../layout/Alerts';

const UserDetailsForm = () => {
  const authContext = useContext(AuthContext);
  const { aadhaar, register, isAuthenticated, aadhaarAuth, logout, error, clearErrors } = authContext;
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const [user, setUser] = useState({
    aadhaarNumber: aadhaar,
    name: '',
    mobileNumber: '',
    email: '',
    dateOfBirth: '',
    district: '',
    subDistrict: '',
    role: '',
    category: '',
    subCategory: '',
    username: '',
    password: '',
    password2: ''
  });

  // Extracting individual variables for clarity
  const {
    aadhaarNumber,
    name,
    mobileNumber,
    email,
    dateOfBirth,
    district,
    subDistrict,
    role,
    category,
    subCategory,
    username,
    password,
    password2
  } = user;

  // State for managing validation errors
  const [errors, setErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');


  useEffect(() => {
    if (isAuthenticated) {
      // Set the message immediately
      setMessage('Registration Successful! Redirecting to homepage...');

      // Delay navigation by 5 seconds
      const timerId = setTimeout(() => {
        // Navigate to home after 5 seconds
        navigate('/');
        logout();
        console.log("Redirecting to home in 3 seconds...");
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clear the timer if the component unmounts or if isAuthenticated changes before 5 seconds
      return () => clearTimeout(timerId);

      // Dependency array
    }
  }, [isAuthenticated]);


  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Validation function for the form
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Check Aadhaar authentication
    if (!aadhaarAuth) {
      setFormErrorMessage('Aadhaar must be verified.');
      isValid = false;
    }

    // Validate required fields
    ['name', 'mobileNumber', 'email', 'dateOfBirth', 'district', 'role', 'category', 'subCategory', 'username'].forEach(field => {
      if (!user[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        isValid = false;
      }
    });

    // Validate password requirements
    if (user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (user.password !== user.password2) {
      setPasswordError('Passwords do not match.');
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      setFormErrorMessage('Please fill in all required fields and ensure password criteria are met.');
    }

    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (validateForm()) {

      await register(user);

    }
  };
  
  useEffect(() => {
    if (error) {
      setMessage(error);
      clearErrors();  // Clear the error after it's been handled to prevent old error messages from persisting.
    }
  }, [error, clearErrors]);

  const onReset = () => {
    setUser({
      aadhaarNumber: user.aadhaarNumber,
      name: '',
      mobileNumber: '',
      email: '',
      dateOfBirth: '',
      district: '',
      subDistrict: '',
      role: '',
      category: '',
      subCategory: '',
      username: '',
      password: '',
      password2: ''
    });
    setErrors({});
    setFormErrorMessage('');
    setPasswordError('');
  };

  return (
    <form onSubmit={onSubmit} style={{ alignItems: 'center' }}>
      <Paper
        style={{
          padding: '16px',
          borderRadius: '10px',
          marginBottom: '16px',
          width: '80%',
          margin: '0 auto'
        }}
      >
        <Alerts message={message} />
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Aadhaar Number<span style={{ color: 'orange' }}>*</span>
          </Typography>
          <TextField
            variant="outlined"
            type="text"
            name="aadhaarNumber"
            fullWidth
            value={aadhaarNumber}
            disabled
          />
          <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
            {aadhaarAuth ? (
              <>
                <CheckCircleIcon style={{ color: 'green', marginRight: 8 }} />
                Aadhaar Verified
              </>
            ) : (
              <>
                <CancelIcon style={{ color: 'red', marginRight: 8 }} />
                Aadhaar Not Verified
              </>
            )}
          </Typography>
        </Box>

        <Box bgcolor="#093c98" borderRadius="10px" p={1} mb={2}>
          <Typography variant="h6" color="white">
            Registration Form (Mobile Verification is Required)
          </Typography>
        </Box>

        {formErrorMessage && (
          <Typography variant="subtitle2" color="red" gutterBottom>
            {formErrorMessage}
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Name<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Name"
              variant="outlined"
              type="text"
              name="name"
              fullWidth
              value={name}
              onChange={onChange}
              error={!!errors.name} // Check if there's an error for the 'name' field
              helperText={errors.name} // Display the specific error message if there is one
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Mobile Number<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Mobile Number"
              variant="outlined"
              type="text"
              name="mobileNumber"
              fullWidth
              value={mobileNumber}
              onChange={onChange}
              error={!!errors.mobileNumber} // Check if there's an error for the 'name' field
              helperText={errors.mobileNumber} // Display the specific error message if there is one
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Email Address<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Email Address"
              variant="outlined"
              type="email"
              name="email"
              fullWidth
              value={email}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Date of Birth<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              type="date"
              name="dateOfBirth"
              fullWidth
              value={dateOfBirth}
              onChange={onChange}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              District<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="District"
              variant="outlined"
              type="text"
              name="district"
              fullWidth
              value={district}
              onChange={onChange}
              error={!!errors.district}
              helperText={errors.district}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sub-district
            </Typography>
            <TextField
              placeholder="Sub-district"
              variant="outlined"
              type="text"
              name="subDistrict"
              fullWidth
              value={subDistrict}
              onChange={onChange}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Typography variant="subtitle1"
            fontWeight="bold"
            gutterBottom

          >
            Role<span style={{ color: 'orange' }}>*</span>
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={role}
              onChange={onChange}
              error={!!errors.role}
              helperText={errors.role}>
              <MenuItem value="user">I am a Healthcare Professional</MenuItem>
              <MenuItem value="admin">I am a Facility Manager/Administrator</MenuItem>
              <MenuItem value="facilitymanager">I am a healthcare Professional & Facility Manager</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Category<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Category"
              variant="outlined"
              type="text"
              name="category"
              fullWidth
              value={category}
              onChange={onChange}
              error={!!errors.category}
              helperText={errors.category}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sub-Category<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Sub-category"
              variant="outlined"
              type="text"
              name="subCategory"
              value={subCategory}
              onChange={onChange}
              error={!!errors.subCategory}
              helperText={errors.subCategory}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Username<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Username"
              variant="outlined"
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Password<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Password"
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Confirm Password<span style={{ color: 'orange' }}>*</span>
            </Typography>
            <TextField
              placeholder="Confirm Password"
              variant="outlined"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              error={!!errors.password2 || !!passwordError}
              helperText={errors.password2 || passwordError}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <Button variant="outlined" color="primary" onClick={onReset}>
          Reset
        </Button>

        <Button
          type="submit"
          sx={{
            margin: '0 10px',
            color: 'rgb(255, 255, 255)',
            textTransform: 'none',
            background: "#D66025",
            border: 'none',
            borderRadius: '5px',
            fontWeight: '500',
            fontSize: '18px',
            textAlign: 'center',
            '&:hover': {
              background: "#C14E20",
            },
          }}
        >
          Submit
        </Button>
      </div>
    </form>

  );
}

export default UserDetailsForm;
