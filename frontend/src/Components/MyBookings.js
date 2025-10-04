// src/Components/MyBookings.js
import React, { useEffect, useState } from 'react';
import api from '../Services/api';
import Navigation from './navigation';
import '../styles/services.css';
import EditBookingForm from './EditBookingForm'; // ← ADDED

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false); // ← ADDED
  const [selectedBookingId, setSelectedBookingId] = useState(null); // ← ADDED
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to load your bookings.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userId]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(bookings.filter(b => b.id !== bookingId));
      alert('Booking deleted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete booking.');
    }
  };

  const handleEdit = (booking) => { // ← UPDATED
    setSelectedBookingId(booking.id);
    setShowEditForm(true);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        Loading your bookings...
      </div>
    );
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", minHeight: "100vh" }}>
      <Navigation showLogout={true} />
      <div style={{ paddingTop: "100px", paddingLeft: "20px", paddingRight: "20px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#2d3748" }}>
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
            You have no bookings yet.
          </p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {bookings.map((booking) => (
              <div key={booking.id} style={{
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "20px"
              }}>
                <h3 style={{ margin: "0 0 12px 0", color: "#2d3748" }}>
                  Booking #
                </h3>
                <p><strong>Full Name:</strong> {booking.name}</p>
                 
                  <p><strong>Email:</strong> {booking.email}</p>
                 <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>Address:</strong> {booking.address}</p>

                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Status:</strong> {booking.assignmentStatus}</p>
                {booking.assignedStaffName && (
                  <p><strong>Staff:</strong> {booking.assignedStaffName}</p>
                )}
                <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleEdit(booking)}
                    style={{
                      backgroundColor: "#8b5cf6",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    style={{
                      backgroundColor: "#0c0c0cff",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ EDIT BOOKING MODAL */}
        {showEditForm && selectedBookingId && (
          <EditBookingForm
            bookingId={selectedBookingId}
            onClose={() => setShowEditForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyBookings;