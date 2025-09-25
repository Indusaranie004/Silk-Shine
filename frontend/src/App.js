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
import StaffRegister from './Components/staffRegister';
import ServiceCards from './Components/ServiceCards';
import GuestServices from './Components/guestServices';
import ClientProfilePage from './Components/ClientProfilePage';
import StaffDashboard from './Components/StaffDashboard';
import MyBookings from './Components/MyBookings';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Routes>

          <Route path="/" element={<HomeGuest />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPW" element={<ForgotPW />} />
          <Route path="/dashboard_admin" element={<Dashboard/>} />
          <Route path="/customers" element={<Dashboard/>} />
          <Route path="/staffregister" element={<StaffRegister />} /> {/* ✅ Add this */}
          <Route path="/services" element={<ServiceCards />} />
          <Route path="/guest-services" element={<GuestServices />} />
          <Route path='/client-profile' element={<ClientProfilePage />} />
          <Route path='/dashboard_staff' element={<StaffDashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
 
 

 


          
        </Routes>
      </div>
    </Router>
  );
}

export default App;