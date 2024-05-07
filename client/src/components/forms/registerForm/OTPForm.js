import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, styled } from '@mui/material';
import AuthContext from '../../../context/auth/authContext';

const InputElement = styled('input')(({ theme }) => ({
  width: '40px',
  height: '40px',
  margin: '0 5px',
  fontSize: '20px',
  textAlign: 'center',
  borderRadius: '8px',
  border: '1px solid #ccc',
  '&:focus': {
    borderColor: '#007FFF',
    outline: 'none',
  },
}));

function OTPInput({ length, value, onChange }) {
  const inputRefs = useRef(new Array(length).fill(null));

  const focusInput = index => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && !event.target.value) {
      // Move focus to previous input if current is empty and backspace is pressed
      focusInput(index - 1);
    }
  };

  const handleChange = (event, index) => {
    const newOtp = [...value];
    newOtp[index] = event.target.value;
    onChange(newOtp.join(''));

    if (event.target.value && index < length - 1) {
      focusInput(index + 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {Array.from({ length }).map((_, index) => (
        <InputElement
          key={index}
          value={value[index] || ''}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onFocus={e => e.target.select()}
          inputMode="numeric"
          maxLength="1"
          ref={el => inputRefs.current[index] = el}
        />
      ))}
    </Box>
  );
}

const OTPForm = () => {

  const { setAadhaarAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [otpResent, setOtpResent] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const onReset = () => {
    setOtp('');
  };

  const handleResendOTP = () => {
    // Assuming resend OTP logic is implemented here
    setTimeLeft(68);  // Reset timer
    setOtpResent(true);  // Show message that OTP has been resent
    setTimeout(() => setOtpResent(false), 4000);  // Hide message after 4 seconds
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp.length === 6 && otp==='000000') {
      // console.log('OTP submitted:', otp);
      setAadhaarAuth(true);
      navigate('/userform');
    } else {
      console.log('Invalid OTP. Please enter a 6-digit OTP.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ margin: 'auto', width: '50%', padding: 20, boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
        <h1>Enter OTP</h1>
        <p>We have sent an OTP to the Aadhaar linked mobile number *****2062</p>
        <OTPInput length={6} value={otp} onChange={setOtp} />
        <p style={{ margin: '20px 0' }}>
          Didn't receive OTP? {
            timeLeft > 0 ? (
              `Resend OTP ${timeLeft} seconds remaining`
            ) : (
              <Button variant="text" color="primary" onClick={handleResendOTP}>
                Resend OTP
              </Button>
            )
          }
        </p>
        {otpResent && <p>OTP has been resent to your mobile.</p>}
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
      </div>
    </form>
  );
};

export default OTPForm;
