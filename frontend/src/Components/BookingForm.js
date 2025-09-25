// src/Components/BookingForm.js
import React, { useState } from 'react';
import api from '../Services/api'; // ← Import from Services/api.js

const BookingForm = ({ service, onClose }) => {
  const userId = localStorage.getItem('userId'); // From login

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userId: userId,
      serviceId: service.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      gender: formData.gender,
      date: formData.date,
      time: formData.time,
    };

    try {
      await api.post('/bookings', bookingData);
      alert('✅ Booking confirmed!');
      onClose();
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('❌ Failed to book. Please try again.');
    }
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h2>Book Appointment: {service.name}</h2>
        <p><strong>Price:</strong> Rs. {service.price}</p>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>
          <input name="date" type="date" value={formData.date} onChange={handleChange} required />
          <input name="time" type="time" value={formData.time} onChange={handleChange} required />

          <div className="form-actions">
            <button type="submit">Confirm Booking</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
