import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import LoginForm from './components/forms/loginForm/LoginForm';
import RegistrationForm from './components/forms/registerForm/RegistrationForm';
import AadhaarForm from './components/forms/registerForm/AadhaarForm';
import OTPForm from './components/forms/registerForm/OTPForm';
import UserDetailsForm from './components/forms/UserDetailsForm';

import About from './components/pages/About';
import ResourceCenter from './components/pages/ResourceCenter';
import Support from './components/pages/Support';
import Dashboard from './components/pages/Dashboard';
import setAuthToken from './utils/setAuthToken';
// import Alerts from './components/layout/Alerts';

import AuthState from './context/auth/AuthState';
import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>

        <Fragment>
          <Navbar />
          <div>
            {/* <Alerts /> */}
            <Routes>
              <Route exact path="/" element={<Navigate to="/home" />} />
              <Route
                path="/home"
                element={(
                  <Fragment>
                    <Home />
                  </Fragment>
                )}
              />
              <Route path='/about' element={(
                <Fragment>
                  <About />
                </Fragment>
              )} />
              <Route path='/resource' element={(
                <Fragment>
                  <ResourceCenter />
                </Fragment>
              )} />
              <Route path='/support' element={(
                <Fragment>
                  <Support />
                </Fragment>
              )} />
              <Route path='/login' element={(
                <Fragment>
                  {/* <Login /> */}
                  <LoginForm />
                </Fragment>
              )} />
              <Route path='/register' element={(
                <Fragment>
                  <RegistrationForm />
                </Fragment>
              )} />
              <Route path='/aadhaar' element={(
                <Fragment>
                  <AadhaarForm />
                </Fragment>
              )} />
              <Route path='/otp' element={(
                <Fragment>
                  <OTPForm />
                </Fragment>
              )} />
              <Route path='/userform' element={(
                <Fragment>
                  <UserDetailsForm />
                </Fragment>
              )} />
              <Route path='/dashboard' element={(
                <Fragment>
                  <Dashboard />

                </Fragment>
              )} />
              <Route path='/admlogin' element={(
                <Fragment>
                  {/* <AdmLogin /> */}
                </Fragment>
              )} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </AuthState>

  );
}

export default App;
