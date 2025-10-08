// src/Components/PromotionalForm.js
import React, { useState } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const PromotionalForm = () => {
  const navigate = useNavigate();
  const adminUserId = localStorage.getItem('adminUserId');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'ALL_CLIENTS',
    singleClientId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Navigate to promotions/all
  const handleClose = () => {
    navigate('/dashboard_admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const target =
      formData.targetAudience === 'SINGLE_CLIENT'
        ? `SINGLE_CLIENT:${formData.singleClientId}`
        : 'ALL_CLIENTS';

    const promoData = {
      title: formData.title,
      content: formData.content,
      targetAudience: target,
    };

    try {
      await api.post('/promotions/send', promoData, {
        headers: { 'X-User-Id': adminUserId },
      });
      alert('✅ Promotional message sent successfully!');
      navigate('/dashboard_admin'); // ✅ Navigate after sending
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('❌ Failed to send promotional message.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>Send Promotional Message</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Message Title"
            style={styles.input}
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Message Content"
            style={styles.textarea}
            required
          />
          <select
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="ALL_CLIENTS">All Clients</option>
            <option value="SINGLE_CLIENT">Single Client</option>
          </select>
          {formData.targetAudience === 'SINGLE_CLIENT' && (
            <input
              type="text"
              name="singleClientId"
              value={formData.singleClientId}
              onChange={handleChange}
              placeholder="Enter Client User ID"
              style={styles.input}
              required
            />
          )}
          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" style={styles.sendBtn}>
              Send Promotional Message
            </button>
          </div>
        </form>
        <button onClick={handleClose} style={styles.closeBtn}>
          ✕
        </button>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.55)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50
  },
  card: {
    background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
    borderRadius: '1rem',
    padding: '2rem',
    width: '100%',
    maxWidth: '550px',
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    resize: 'none',
    height: '120px'
  },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' },
  cancelBtn: {
    backgroundColor: '#374151',
    color: '#fff',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none'
  },
  sendBtn: {
    background: 'linear-gradient(90deg, #8d73d6, #ac8ef3)',
    color: '#fff',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(99,102,241,0.4)'
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#374151'
  }
};

export default PromotionalForm;
