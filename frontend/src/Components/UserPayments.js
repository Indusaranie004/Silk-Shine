import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import Navigation from './navigation';

const UserPayments = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // logged-in user UUID
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userId) {
        setError("❌ No user logged in. Please log in first.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching payments for userId:", userId);
        const response = await api.get(`/payments/user/${userId}`);
        setPayments(response.data);
      } catch (err) {
        console.error("Error fetching payments:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px', color: 'black' }}>
        Loading payments...
      </p>
    );

  if (error)
    return (
      <p style={{ textAlign: 'center', color: 'red' }}>
        {error}
      </p>
    );

  return (
    <div style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", minHeight: "100vh" }}>
      <Navigation showLogout={true} />

      <div style={{ paddingTop: "80px", paddingLeft: "20px", paddingRight: "20px" }}>
        {/* Back Button aligned right */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={() => navigate('/services')}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Back
          </button>
        </div>

        <h1 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#2d3748" }}>
          My Payments
        </h1>

        {payments.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>No payments found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              backgroundColor: "#fff"
            }}>
              <thead style={{ backgroundColor: "#b57edc", color: "white" }}>
                <tr>
                  <th style={{ padding: "12px 15px", textAlign: "left" }}>Booking ID</th>
                  <th style={{ padding: "12px 15px", textAlign: "left" }}>Amount (Rs.)</th>
                  <th style={{ padding: "12px 15px", textAlign: "left" }}>Payment Method</th>
                  <th style={{ padding: "12px 15px", textAlign: "left" }}>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "12px 15px" }}>{p.bookingId}</td>
                    <td style={{ padding: "12px 15px" }}>{p.amount}</td>
                    <td style={{ padding: "12px 15px" }}>{p.method}</td>
                    <td style={{ padding: "12px 15px" }}>
                      {new Date(p.paymentDate).toLocaleString('en-GB', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', second: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPayments;
