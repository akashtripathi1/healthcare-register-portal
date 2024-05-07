import React, { useContext, useEffect, useState } from 'react';
import { Paper, Typography, TextField, Grid, Box} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthContext from '../../context/auth/authContext';
import Alerts from '../layout/Alerts';
// import CancelIcon from '@mui/icons-material/Cancel';

const Dashboard = () => {
    const { user, loadUser } = useContext(AuthContext);
    loadUser();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
          setMessage('Logged in Successfully!');
        }
      }, [user]);


    // Destructuring the user object to extract user details
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
        password
    } = user || {};  // Ensuring user is defined, otherwise defaulting to an empty object

    // Function to convert date format
    const convertDateFormat = (dateString) => {
        const date = new Date(dateString); // Parse the date string
        const year = date.getFullYear(); // Get the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (adding 1 because months are zero-based)
        const day = String(date.getDate()).padStart(2, '0'); // Get the day
        return `${year}-${month}-${day}`; // Return the formatted date string
    };

    return (
        <Paper
            style={{
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '16px',
                width: '80%',
                margin: '0 auto'
            }}
        >
        <Alerts message={message}/>

            <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Aadhaar Number<span style={{ color: 'orange' }}>*</span>
                </Typography>
                <TextField
                    variant="outlined"
                    type="text"
                    name="aadhaarNumber"
                    fullWidth
                    value={aadhaarNumber || ''}
                    disabled
                />
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>


                            <CheckCircleIcon style={{ color: 'green', marginRight: 8 }} />
                            Aadhaar Verified


                </Typography>
            </Box>

            <Box bgcolor="#093c98" borderRadius="10px" p={1} mb={2}>
                <Typography variant="h6" color="white">
                    User Details
                </Typography>
            </Box>

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
                        value={name || ''}
                        disabled
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
                        value={mobileNumber || ''}
                        disabled
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
                        value={email || ''}
                        disabled
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
                        value={convertDateFormat(dateOfBirth) || '2001-01-01'}
                        disabled
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
                        value={district || ''}
                        disabled
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
                        value={subDistrict || ''}
                        disabled
                    />
                </Grid>
            </Grid>

            <Box mt={2}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Role<span style={{ color: 'orange' }}>* </span>
                </Typography>
                <TextField
                        placeholder="Mobile Number"
                        variant="outlined"
                        type="text"
                        name="mobileNumber"
                        fullWidth
                        value={role || ''}
                        disabled
                    />

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
                        value={category || ''}
                        disabled
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
                        value={subCategory || ''}
                        fullWidth
                        disabled
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
                        value={username || ''}
                        fullWidth
                        disabled
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
                        value={password || ''}
                        fullWidth
                        disabled
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Dashboard;
