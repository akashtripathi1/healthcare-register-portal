import React, { Fragment, useState, useEffect, useContext } from 'react';
import { TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';

import UserIcon from '../../../assets/personLogo.png';
import MobileIcon from '../../../assets/phoneLogo.png';
import Captcha from '../../../assets/captcha.png';

const LoginForm = () => {
  const [selectedForm, setSelectedForm] = useState('id');
  const [errors, setErrors] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);



  const [user, setUser] = useState({
    mobileNumber: '',
    username: '',
    password: '',
    captcha: ''
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate required fields based on selected form type
    const fields = selectedForm === 'id' ? ['username', 'password'] : ['mobileNumber', 'captcha'];
    fields.forEach(field => {
      if (!user[field] || !user[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        isValid = false;
      }
    });

    if (selectedForm === 'id' && user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      setFormErrorMessage('Please fill in all required fields and ensure password criteria are met.');
    }

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login({ username: user.username, password: user.password });
    }
  };

  const onReset = () => {
    setUser({
      mobileNumber: '',
      username: '',
      password: '',
      captcha: ''
    });
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div style={{ margin: 'auto', width: '45%', padding: 20, boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2)' }}>
          <h1>Login to National Healthcare Providers Registry</h1>
          <ToggleButtonGroup
            exclusive
            fullWidth
            onChange={(event, newForm) => setSelectedForm(newForm)}
            style={{ marginBottom: 20 }}
          >
            <ToggleButton value="id" aria-label="Healthcare Professional ID" selected={selectedForm === 'id'}>
              <img src={UserIcon} alt="User icon" style={{ width: '15px', height: 'auto' }} />
              Healthcare Professional ID/Username
            </ToggleButton>
            <ToggleButton value="mobile" aria-label="Mobile Number" selected={selectedForm === 'mobile'}>
              <img src={MobileIcon} alt="Mobile icon" style={{ width: '15px', height: 'auto' }} />
              Mobile Number
            </ToggleButton>
          </ToggleButtonGroup>

          {selectedForm === 'id' ? (
            <div>
              <TextField
                label="Healthcare Professional ID/Username"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                value={user.username}
                onChange={onChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                margin="normal"
                value={user.password}
                onChange={onChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </div>
          ) : (
            <div>
              <TextField
                label="Registered Mobile Number"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={onChange}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />
              <div style={{ display: 'flex' }}>
                <img src={Captcha} alt="Captcha" style={{ width: '90px', height: 'auto' }} />
                <TextField
                  label="Captcha"
                  variant="outlined"
                  name="captcha"
                  fullWidth
                  margin="normal"
                  value={user.captcha}
                  onChange={onChange}
                  error={!!errors.captcha}
                  helperText={errors.captcha}
                />
              </div>
            </div>
          )}

<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Button variant="outlined" color="primary" onClick={onReset}>
            Reset
          </Button>
          
          <Button type="submit" sx={{
                            margin: '0 10px',
                            // border: '1px solid black',                          
                            color: 'rgb(255, 255, 255)',
                            textTransform: 'none',
                            background: "#D66025",
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: '500',
                            fontSize: '18px',
                            textAlign: 'center',
                            '&:hover': {
                                background: "#C14E20", // Darker color on hover
                            },
                        }}
                        >
                            Submit
                        </Button>
        </div>

          <p style={{ textAlign: 'center', marginTop: 20 }}>
            Do not have an account? <Link to="/register" sx={{
                  color: '#d16025',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#d16025'
                  }
                }}> Register Here</Link>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default LoginForm;
