// src/Components/EditBookingForm.js
import React, { useState, useEffect } from 'react';
import api from '../Services/api';

const EditBookingForm = ({ bookingId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    date: '',
    time: '',
    userId: '',      // ← ADDED
    serviceId: null, // ← ADDED
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}`);
        const booking = response.data;
        setFormData({
          name: booking.name || '',
          email: booking.email || '',
          phone: booking.phone || '',
          address: booking.address || '',
          gender: booking.gender || '',
          date: booking.date || '',
          time: booking.time || '',
          userId: booking.userId || '',   // ← ADDED
          serviceId: booking.serviceId || null, // ← ADDED
        });
      } catch (error) {
        console.error('Error loading booking:', error);
        alert('Failed to load booking details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/bookings/${bookingId}`, formData);
      alert('✅ Booking updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('❌ Failed to update booking.');
    }
  };

  if (loading) return <div>Loading booking details...</div>;

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h2>Edit Booking </h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="date" type="date" value={formData.date} onChange={handleChange} required />
          <input name="time" type="time" value={formData.time} onChange={handleChange} required />

          {/* Hidden inputs for userId and serviceId (if needed) */}
          {/* You can hide them if UI doesn't need to show */}
          <input type="hidden" name="userId" value={formData.userId} />
          <input type="hidden" name="serviceId" value={formData.serviceId} />

          <div className="form-actions">
            <button type="submit">Update Booking</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingForm;
