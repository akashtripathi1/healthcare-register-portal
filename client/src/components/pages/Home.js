import React from 'react';
import { Grid, Typography, Link } from '@mui/material';

const Home = () => {
  return (
    <div>
    <Grid container sx={{ padding: 2, backgroundColor: '#1d50ac', width: '100%' }}>
      <Grid item xs={12} sx={{ padding: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2, color: "#fafafa", textAlign: 'left'}}>
          National Healthcare Providers Registry
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{  backgroundColor: '#1d50ac'}}>
        <Grid item xs={12} lg={6} sx={{ padding: 1 }}>
          <Typography variant="h5" sx={{ marginBottom: 1 , color: "#fafafa" }}>Healthcare</Typography>
          <Typography variant="h4" sx={{ marginBottom: 1 , color: "#fafafa"}}>Professionals Registry</Typography>
          <Typography sx={{ marginBottom: 1 , color: "#fafafa"}}>
            Healthcare Professionals Registry (HPR) is a comprehensive repository of registered and
            verified different systems of medicine (Modern medicine, Dentistry, Ayurveda, Unani, Siddha,
            Sowa-Rigpa, Homeopathy) and nurse practitioners delivering healthcare services across India.
          </Typography>
          <Typography sx={{ textAlign: 'right', color: '#d16025', marginBottom: 1 }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#d16025',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#d16025'
                  }
                }}
              >
                Read more
              </Link>

            </Typography>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ padding: 1 }}>
          <Typography variant="h5" sx={{ marginBottom: 1, color: "#fafafa" }}>Health</Typography>
          <Typography variant="h4" sx={{ marginBottom: 1, color: "#fafafa" }}>Facility Registry</Typography>
          <Typography sx={{ marginBottom: 1, color: "#fafafa" }}>
            Health Facility Registry is a comprehensive repository of health facilities of the country
            across modern and traditional systems of medicine. It includes both public and private health
            facilities including hospitals, clinics, diagnostic centers.
          </Typography>
            <Typography sx={{ textAlign: 'right', color: '#d16025', marginBottom: 1 }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#d16025',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#d16025'
                  }
                }}
              >
                Read more
              </Link>

            </Typography>
        </Grid>
      </Grid>
    </Grid>
  </div>
  )
}

export default Home;
