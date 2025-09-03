import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Registration from './Components/registration';
import Login from './Components/login'; 
import ForgotPW from './Components/ForgotPW';
import Dashboard from './Components/dashboard';
import Customer from './Components/customer';
import HomePage from './Components/home';
import HomeGuest from './Components/homeguest';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Routes>

          <Route path="/Guest" element={<HomeGuest />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPW" element={<ForgotPW />} />
          <Route path="/dashboard_admin" element={<Dashboard/>} />
          <Route path="/customers" element={<Dashboard/>} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;