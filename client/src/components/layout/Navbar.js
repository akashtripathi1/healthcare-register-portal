import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, InputBase } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/NHALogo.svg';
import logo2 from '../../assets/AbdmLogo.svg';
import SearchIcon from '@mui/icons-material/Search';
import AuthContext from '../../context/auth/authContext';

function Navbar() {

    const { logout, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="default" sx={{ flexDirection: 'column' }}>
            <Toolbar variant="dense" sx={{ bgcolor: 'white', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>

                    <h1>
                        <img src={logo} alt="logo" className="mainLogo" />
                    </h1>
                    <h1>
                        <img src={logo2} alt="logo" className="mainLogo" />
                    </h1>
                </div>
                {(!isAuthenticated)
                    ?
                    <Box>
                        <Link to='/login'>
                            <Button sx={{
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
                                Login/Registration
                            </Button>
                        </Link>
                        <Link to='/'>
                            <Button sx={{
                                margin: '0 10px',
                                // border: '1px solid black'  ,
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
                                Admin Login
                            </Button>
                        </Link>
                    </Box>

                    :
                    <>

                        <Button onClick={() => {
                            navigate('/')
                            logout();
                        }} sx={{
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
                            Logout
                        </Button>

                    </>}
            </Toolbar>
            <Toolbar sx={{ fontFamily: 'Roboto', boxShadow: 'none', backgroundColor: '#093c98', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link to='/home' style={{ textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ color: '#fafafa', marginRight: '10px', border: '1px solid transparent', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#062e74'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            Home
                        </Button>
                    </Link>
                    <Link to='/about' style={{ textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ color: '#fafafa', marginRight: '10px', border: '1px solid transparent', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#062e74'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            About ABDM
                        </Button>
                    </Link>
                    <Link to='/resource' style={{ textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ color: '#fafafa', marginRight: '10px', border: '1px solid transparent', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#062e74'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            Resource Center
                        </Button>
                    </Link>
                    <Link to='/support' style={{ textDecoration: 'none' }}>
                        <Button color="inherit" sx={{ color: '#fafafa', borderRadius: '5px', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#062e74'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            Support
                        </Button>
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: 1, padding: '2px 10px' }}>

                    <Button sx={{
                        margin: '0 10px',
                        // border: '1px solid black'  ,
                        color: 'rgb(255, 255, 255)',
                        textTransform: 'none',
                        bgcolor: "#1b346e",
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '18px',
                        textAlign: 'center',
                        '&:hover': {
                            background: "#1b346e", // Darker color on hover
                        },
                    }}
                    >
                        Know Your Doctor/Facility
                        <IconButton type="submit" aria-label="search" sx={{ color: "#fafafa" }}>
                            <SearchIcon />
                        </IconButton>
                    </Button>


                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
