import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const PaymentForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error.response?.data || error.message);
        alert('❌ Failed to load booking details');
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      bookingId,
      method: paymentMethod,
      cardNumber: paymentMethod === 'CARD' ? cardNumber : null,
      cardHolder: paymentMethod === 'CARD' ? cardHolder : null,
      expiry: paymentMethod === 'CARD' ? expiry : null,
    };

    try {
      await api.post('/payments', paymentData);
      alert('✅ Payment successful!');
      navigate('/services'); 
    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message);
      alert('❌ Payment failed. Please try again.');
    }
  };

  if (!booking) return <p style={{ textAlign: 'center', marginTop: '50px', color: 'black' }}>Loading booking details...</p>;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)', // Overlay dark
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #f0f0f0, #ffffff)', // Gray and white mix
        padding: '30px 25px',
        borderRadius: '16px',
        width: '400px',
        maxWidth: '100%',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        textAlign: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        color: 'black'
      }}>
        <h2 style={{ marginBottom: '20px' }}>💳 Payment for {booking.name}</h2>
        <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Service:</strong> {booking.serviceName}</p>
        <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Amount:</strong> Rs. {booking.price}</p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
            Payment Method
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                marginTop: '5px',
                marginBottom: '15px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                outline: 'none',
                color: 'black'
              }}
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="ONLINE">Online</option>
            </select>
          </label>

          {paymentMethod === 'CARD' && (
            <>
              <input
                name="cardNumber"
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  outline: 'none',
                  color: 'black'
                }}
              />
              <input
                name="cardHolder"
                type="text"
                placeholder="Card Holder Name"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  outline: 'none',
                  color: 'black'
                }}
              />
              <input
                name="expiry"
                type="text"
                placeholder="Expiry (MM/YY)"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  outline: 'none',
                  color: 'black'
                }}
              />
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button type="submit" style={{
              backgroundColor: '#8e44ad',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >Pay Now</button>

            <button type="button" onClick={() => navigate('/my-bookings')} style={{
              backgroundColor: 'black',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#333'}
            onMouseOut={e => e.currentTarget.style.background = 'black'}
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
