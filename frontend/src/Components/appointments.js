// src/Components/appointments.js
"use client"

import React, { useEffect, useState } from "react";
import api from '../Services/api';
import "../styles/services.css";
import AssignStaffModal from './AssignStaffModal';

const AppointmentsContent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch all bookings
  const fetchAllBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  // Handle staff assignment success
  const handleAssignSuccess = () => {
    fetchAllBookings(); // Refresh the list
  };

  // Handle delete
  const handleDelete = (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    api.delete(`/bookings/${bookingId}`)
      .then(() => {
        setBookings(bookings.filter(b => b.id !== bookingId));
        alert('Appointment deleted successfully!');
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to delete appointment.');
      });
  };

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bookings.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(bookings.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading all appointments...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#2d3748' }}>
        All Appointments
      </h1>

      {bookings.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: '900px'
            }}>
              <thead style={{ background: "#8d73d6", color: "#fff" }}>
                <tr style={{ background: "#8d73d6", color: "#fff" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Client</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Service ID</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Staff</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Assign</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}>{booking.id}</td>
                    <td style={{ padding: '12px' }}>{booking.name}</td>
                    <td style={{ padding: '12px' }}>{booking.serviceId}</td>
                    <td style={{ padding: '12px' }}>{booking.date}</td>
                    <td style={{ padding: '12px' }}>{booking.time}</td>
                    <td style={{ padding: '12px' }}>{booking.assignmentStatus}</td>
                    <td style={{ padding: '12px' }}>{booking.assignedStaffName || '—'}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => {
                          setSelectedBookingId(booking.id);
                          setShowAssignModal(true);
                        }}
                        style={{
                          backgroundColor: "#8b5cf6",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px"
                        }}
                      >
                        Assign
                      </button>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                          color: "#e53e3e",
                          padding: "4px",
                          borderRadius: "4px",
                          transition: "background 0.2s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#fee"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: currentPage === page ? "#8b5cf6" : "#f3f4f6",
                    color: currentPage === page ? "#fff" : "#374151",
                    fontWeight: "600",
                    transition: 'all 0.3s ease'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ASSIGN STAFF MODAL */}
      {showAssignModal && selectedBookingId && (
        <AssignStaffModal
          bookingId={selectedBookingId}
          onClose={() => setShowAssignModal(false)}
          onAssignSuccess={handleAssignSuccess}
        />
      )}
    </div>
  );
};

export default AppointmentsContent;
