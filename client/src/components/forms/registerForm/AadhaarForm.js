import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Captcha from '../../../assets/captcha.png';
import TermsAndConditions from './TermsAndCondition';
import AuthContext from '../../../context/auth/authContext';

const AadhaarForm = () => {
  const { setAadhaarNumber } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    aadhaar: '',
    captcha: '',
    agree: false
  });
  const { aadhaar, captcha, agree } = user;
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Aadhaar number
    if (aadhaar.length !== 12 || isNaN(aadhaar)) {
      newErrors.aadhaar = 'Please enter a valid Aadhaar number (12 digits).';
      isValid = false;
    }

    // Validate captcha
    if (captcha !== '0') { // Assuming '0' is a placeholder for correct captcha.
      newErrors.captcha = 'Please enter the correct captcha.';
      isValid = false;
    }

    // Validate agreement to terms
    if (!agree) {
      newErrors.agree = 'You must agree to the terms and conditions.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onCheckboxChange = e => setUser({ ...user, [e.target.name]: e.target.checked });

  const onReset = () => {
    setUser({ aadhaar: '', captcha: '', agree: false });
    setErrors({});
  };

  const onSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      setAadhaarNumber(aadhaar);
      navigate('/otp');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ margin: 'auto', width: '100%', padding: 20 }}>
        <p style={{ fontWeight: 'bold', marginBottom: 5 }}>Enter your Aadhaar Number/Virtual ID<span style={{ color: 'orange' }}>*</span></p>
        <TextField
          variant="outlined"
          name="aadhaar"
          type="number"
          fullWidth
          margin="normal"
          value={aadhaar}
          onChange={onChange}
          error={!!errors.aadhaar}
          helperText={errors.aadhaar}
        />
        <TermsAndConditions />
        <FormControlLabel
    control={
      <Checkbox 
        name="agree" 
        checked={agree} 
        onChange={onCheckboxChange}
        color="primary"
      />
    }
    label="I agree"
  />
  {/* Display error message only if there's an error */}
  {errors.agree && <FormHelperText style={{color: '#DF6969'}}>{errors.agree}</FormHelperText>}

        <div style={{ display: 'flex' }}>
          <img src={Captcha} style={{ width: '90px', height: 'auto' }} />
          <TextField
            label="Captcha"
            variant="outlined"
            name="captcha"
            fullWidth
            margin="normal"
            value={captcha}
            onChange={onChange}
            error={!!errors.captcha}
            helperText={errors.captcha}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <Button variant="outlined" color="primary" onClick={onReset}>
            Reset
          </Button>
          
          <Button type="submit" sx={{
                            margin: '0 10px',
                            color: 'rgb(255, 255, 255)',
                            textTransform: 'none',
                            background: "#D66025",
                            borderRadius: '5px',
                            fontWeight: '500',
                            fontSize: '18px',
                            textAlign: 'center',
                            '&:hover': {
                                background: "#C14E20",
                            },
                        }}>
            Submit
          </Button>
        </div>
        <p style={{ textAlign: 'center', marginTop: 20 }}>
          Already have an account? 
          <Link to='/login' style={{ color: '#d16025', textDecoration: 'none' }}> Login Here</Link>
        </p>
      </div>
    </form>
  );
}

export default AadhaarForm;
