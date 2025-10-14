// src/Components/StaffSalaryCalculate.js
import React, { useState, useEffect } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const StaffSalaryCalculate = () => {
  const navigate = useNavigate();
  const adminUserId = localStorage.getItem('adminUserId'); // Optional header

  const [formData, setFormData] = useState({
    staffId: '',
    dailyPayment: '',
    workingDays: '',
    bonus: '',
    etfPercentage: '5',
    epfPercentage: '0',
    month: '',
    year: '',
    notes: ''
  });

  const [totalSalary, setTotalSalary] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Calculate total salary dynamically
    const daily = parseFloat(updatedData.dailyPayment || 0);
    const days = parseInt(updatedData.workingDays || 0);
    const bonus = parseFloat(updatedData.bonus || 0);
    setTotalSalary(daily * days + bonus);
  };

  const handleClose = () => {
    navigate('/dashboard_admin'); // navigate back to dashboard
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salaryData = {
      ...formData,
      dailyPayment: parseFloat(formData.dailyPayment),
      workingDays: parseInt(formData.workingDays),
      bonus: parseFloat(formData.bonus || 0),
      etfPercentage: parseFloat(formData.etfPercentage),
      epfPercentage: parseFloat(formData.epfPercentage),
      month: parseInt(formData.month),
      year: parseInt(formData.year)
    };

    try {
      await api.post('/staff-salary', salaryData, {
        headers: { 'X-User-Id': adminUserId }
      });
      alert('✅ Salary calculated and saved successfully!');
      navigate('/dashboard_admin');
    } catch (error) {
      console.error('Error saving salary:', error.response?.data || error.message);
      alert('❌ Failed to save salary. Please try again.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>Staff Salary Calculation</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="staffId" value={formData.staffId} onChange={handleChange} placeholder="Staff ID" style={styles.input} required />
          <input type="number" name="dailyPayment" value={formData.dailyPayment} onChange={handleChange} placeholder="Daily Payment" style={styles.input} required />
          <input type="number" name="workingDays" value={formData.workingDays} onChange={handleChange} placeholder="Working Days" style={styles.input} required />
          <input type="number" name="bonus" value={formData.bonus} onChange={handleChange} placeholder="Bonus" style={styles.input} />
          <input type="number" name="etfPercentage" value={formData.etfPercentage} onChange={handleChange} placeholder="ETF %" style={styles.input} required />
          <input type="number" name="epfPercentage" value={formData.epfPercentage} onChange={handleChange} placeholder="EPF %" style={styles.input} required />
          <input type="number" name="month" value={formData.month} onChange={handleChange} placeholder="Month (1-12)" style={styles.input} min="1" max="12" required />
          <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" style={styles.input} required />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Name" style={styles.textarea} />

          {/* Display Total Salary */}
          <div style={styles.totalSalary}>
            <strong>Total Salary:</strong> {totalSalary.toFixed(2)}
          </div>

          <div style={styles.actions}>
            <button type="button" style={styles.cancelBtn} onClick={handleClose}>Cancel</button>
            <button type="submit" style={styles.sendBtn}>Save Salary</button>
          </div>
        </form>
        <button onClick={handleClose} style={styles.closeBtn}>✕</button>
      </div>
    </div>
  );
};

// Internal CSS
const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.55)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 50
  },
  card: {
    background: 'linear-gradient(135deg, #ffffff, #f0f4ff)',
    borderRadius: '1rem',
    padding: '2rem',
    width: '90%',         // increased width
    maxWidth: '700px',    // max width larger
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, // less gap
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem', // less height
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    padding: '0.5rem 0.75rem', // less height
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'none',
    height: '80px' // reduced height
  },
  totalSalary: {
    fontSize: '1rem',
    color: '#1f2937',
    marginTop: '0.5rem',
    textAlign: 'right'
  },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' },
  cancelBtn: {
    backgroundColor: '#374151',
    color: '#fff',
    padding: '0.4rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none'
  },
  sendBtn: {
    background: 'linear-gradient(90deg, #8d73d6, #ac8ef3)',
    color: '#fff',
    padding: '0.4rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 12px rgba(99,102,241,0.4)'
  },
  closeBtn: {
    position: 'absolute', top: '1rem', right: '1rem',
    background: 'none', border: 'none',
    fontSize: '1.25rem', cursor: 'pointer', color: '#374151'
  }
};

export default StaffSalaryCalculate;
