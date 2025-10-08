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
import PaymentForm from './Components/PaymentForm';
import UserPayments from './Components/UserPayments'; 
import About from './Components/About';
import GuestAbout from './Components/GuestAbout';
import AllPayments from './Components/AllPayments'; 
import PromotionalForm from './Components/PromotionalForm';
import PromotionsTable from './Components/PromotionsTable';
import ContactUsForm from './Components/ContactUsForm'; 
import GuestContactUs from './Components/GuestContactUs';
import AllContact from './Components/AllContact';
import StaffServicesDisplay from './Components/StaffServicesDisplay';
import FinanceDashboard from './Components/FinaceDashboard';
import StaffSalaryCalculate from './Components/StaffSalaryCalculate';
import StaffSalaryTable from './Components/StaffSalaryTable';
import StaffProfileWithSalary from './Components/StaffProfileWithSalary';
import StaffSalaryDashboard from './Components/StaffSalaryDashboard';


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
          <Route path="/payment/:bookingId" element={<PaymentForm />} />
          <Route path="/my-payments" element={<UserPayments />} />
          <Route path="/about" element={<About />} />
          <Route path="/guest-about" element={<GuestAbout />} />
          <Route path="/all-payments" element={<AllPayments />} /> 
          <Route path="/promotions-form" element={<PromotionalForm />} />
          <Route path="/promotions/all" element={<PromotionsTable />} />
          <Route path="/contact-us" element={<ContactUsForm />} />
          <Route path="/guest-contact-us" element={<GuestContactUs />} />
          <Route path="/all-contacts" element={<AllContact />} />
          <Route path="/staff-services" element={<StaffServicesDisplay />} />
          <Route path="/finance-dashboard" element={<FinanceDashboard />} />
          <Route path="/staff-salary-calculate" element={<StaffSalaryCalculate />} />
          <Route path="/staff-salaries" element={<StaffSalaryTable />} />
          <Route path="/staff-profile-salary" element={<StaffProfileWithSalary />} />
          <Route path="/staff-salary-dashboard" element={<StaffSalaryDashboard />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;