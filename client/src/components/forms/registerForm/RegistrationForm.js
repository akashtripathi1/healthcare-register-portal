import React, { useState } from 'react';
import { ToggleButtonGroup, IconButton , ToggleButton } from '@mui/material';
import AadhaarForm from './AadhaarForm'; // Assuming this is the import path for the Aadhaar form
import DrivingLicenseForm from './DrivingLicenseForm'; // Assuming this is the import path for the Driving License form
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AadhaarIcon from '../../../assets/aadhaar-icon.png'

const RegistrationForm = () => {
  const [selectedForm, setSelectedForm] = useState('aadhaar');

  return (
    <div style={{ margin: 'auto', width: '45%', padding: 20, boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2)' }}>
      <h1>Create your Healthcare Professional ID</h1>
      <ToggleButtonGroup
        exclusive
        value={selectedForm}
        onChange={(event, newForm) => setSelectedForm(newForm)}
        fullWidth
        style={{ marginBottom: 20 }}
      >
        <ToggleButton value="aadhaar" aria-label="Aadhaar">
        <img alt="aadhaar" src={AadhaarIcon} style={{ width: '50px', height: 'auto' }} />
          Aadhaar
        </ToggleButton>
        <ToggleButton value="drivingLicense" aria-label="Driving License">
          <IconButton type="submit" aria-label="search" >
            <TextSnippetIcon />
          </IconButton>
          Driving License

        </ToggleButton>
      </ToggleButtonGroup>

      {selectedForm === 'aadhaar' ? <AadhaarForm /> : <DrivingLicenseForm />}


    </div>
  );
}

export default RegistrationForm;
