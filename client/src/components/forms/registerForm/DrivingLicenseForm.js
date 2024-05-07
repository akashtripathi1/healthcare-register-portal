import React from 'react';
import { Link } from 'react-router-dom';

const DrivingLicense = () => {
  return (
    <div>

        currently this option is not available
        <p style={{ textAlign: 'center', marginTop: 20 }}>
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
      
    </div>
  )
}

export default DrivingLicense
