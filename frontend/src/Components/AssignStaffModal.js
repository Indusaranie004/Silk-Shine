// src/Components/AssignStaffModal.js
import React, { useState, useEffect } from 'react';
import api from '../Services/api';
import '../styles/services.css';

const AssignStaffModal = ({ bookingId, onClose, onAssignSuccess }) => {
  const [availableStaff, setAvailableStaff] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableStaff = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}/available-staff`);
        setAvailableStaff(response.data.availableStaff || []);
      } catch (error) {
        console.error('Error fetching staff:', error);
        alert('Failed to load available staff.');
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableStaff();
  }, [bookingId]);

  const handleAssign = async () => {
    if (!selectedStaffId) {
      alert('Please select a staff member.');
      return;
    }

    try {
      const response = await api.post(`/bookings/${bookingId}/assign-staff`, {
        staffId: parseInt(selectedStaffId)
      });
      alert('✅ Staff assigned successfully!');
      onAssignSuccess();
      onClose();
    } catch (error) {
      // Show backend's error message
      const errorMessage = error.response?.data?.message || error.response?.data || error.message;
      alert(`❌ Failed to assign staff. Reason: ${errorMessage}`);
    }
  };

  return (
    <div className="booking-form-overlay">
      <div className="booking-form">
        <h2>Assign Staff to Booking #{bookingId}</h2>

        {loading ? (
          <p>Loading available staff...</p>
        ) : availableStaff.length === 0 ? (
          <p>No staff available for this time slot.</p>
        ) : (
          <>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            >
              <option value="">Select Staff</option>
              {availableStaff.map(staff => (
                <option key={staff.staffId} value={staff.staffId}>
                  {staff.fullName} ({staff.specialization})
                </option>
              ))}
            </select>

            <div className="form-actions">
              <button type="button" onClick={handleAssign}>
                Assign Staff
              </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignStaffModal;