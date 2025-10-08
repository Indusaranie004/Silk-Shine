// src/Components/StaffSalaryTable.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { jsPDF } from 'jspdf';

const StaffSalaryTable = () => {
  const navigate = useNavigate();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch all salaries
  const fetchSalaries = async () => {
    try {
      const response = await api.get('/staff-salary');
      setSalaries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching salaries:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  // Delete salary
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this salary?')) return;
    try {
      await api.delete(`/staff-salary/${id}`);
      setSalaries(salaries.filter((s) => s.id !== id));
      alert('✅ Salary deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error.response || error.message);
      alert('❌ Failed to delete salary. ' + (error.response?.data?.message || ''));
    }
  };

  // Download salary slip
  const handleDownloadSlip = (salary) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Salary Slip", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Staff ID: ${salary.staffId}`, 20, 35);
    doc.text(`Month: ${salary.month} / Year: ${salary.year}`, 20, 42);

    // Draw table header
    const startY = 55;
    const rowHeight = 8;

    doc.setFillColor(141, 115, 214); // purple header
    doc.setTextColor(255, 255, 255);
    doc.rect(20, startY, 170, rowHeight, 'F');
    doc.text("Description", 25, startY + 6);
    doc.text("Amount", 140, startY + 6);

    doc.setTextColor(0, 0, 0);

    const rows = [
      { desc: "Daily Payment", amount: salary.dailyPayment },
      { desc: "Working Days", amount: salary.workingDays },
      { desc: "Bonus", amount: salary.bonus },
      { desc: "ETF %", amount: salary.etfPercentage },
      { desc: "ETF Amount", amount: salary.etfAmount },
      { desc: "EPF %", amount: salary.epfPercentage },
      { desc: "EPF Amount", amount: salary.epfAmount },
      { desc: "Total Salary", amount: salary.totalSalary },
    ];

    rows.forEach((r, i) => {
      const y = startY + rowHeight * (i + 1);
      doc.text(`${r.desc}`, 25, y + 6);
      doc.text(`${r.amount}`, 140, y + 6);
    });

    if (salary.notes) {
      doc.text(`Notes: ${salary.notes}`, 20, startY + rowHeight * (rows.length + 1) + 6);
    }

    doc.save(`SalarySlip_${salary.staffId}_${salary.month}_${salary.year}.pdf`);
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = salaries.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(salaries.length / rowsPerPage);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Staff Salaries</h1>

      {/* Staff Salary Calculate Button */}
      <button
        style={styles.addBtn}
        onClick={() => navigate('/staff-salary-calculate')}
      >
        + Staff Salary Calculate
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px' }}>
            <thead>
              <tr style={{ background: '#8d73d6', color: '#fff' }}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Staff ID</th>
                <th style={styles.th}>Daily Payment</th>
                <th style={styles.th}>Working Days</th>
                <th style={styles.th}>Bonus</th>
                <th style={styles.th}>ETF %</th>
                <th style={styles.th}>EPF %</th>
                <th style={styles.th}>Month</th>
                <th style={styles.th}>Year</th>
                <th style={styles.th}>Total Salary</th>
                <th style={styles.th}>ETF Amount</th>
                <th style={styles.th}>EPF Amount</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((s) => (
                <tr key={s.id} style={styles.row}>
                  <td>{s.id}</td>
                  <td>{s.staffId}</td>
                  <td>{s.dailyPayment}</td>
                  <td>{s.workingDays}</td>
                  <td>{s.bonus}</td>
                  <td>{s.etfPercentage}</td>
                  <td>{s.epfPercentage}</td>
                  <td>{s.month}</td>
                  <td>{s.year}</td>
                  <td>{s.totalSalary}</td>
                  <td>{s.etfAmount}</td>
                  <td>{s.epfAmount}</td>
                  <td>{s.notes}</td>
                  <td>
                    {/* Delete Button */}
                    <button
                      style={{ ...styles.actionBtn, backgroundColor: '#ef4444' }}
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>

                    {/* Download Button */}
                    <button
                      style={{ ...styles.actionBtn, backgroundColor: '#10b981', marginLeft: '0.1rem' }}
                      onClick={() => handleDownloadSlip(s)}
                    >
                      Pay Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  style={{
                    ...styles.pageBtn,
                    backgroundColor: currentPage === page ? '#8d73d6' : '#f3f4f6',
                    color: currentPage === page ? '#fff' : '#374151'
                  }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Internal CSS
const styles = {
  container: { padding: '0.5rem', fontFamily: 'Arial, sans-serif' },
  heading: { fontSize: '1.75rem', marginBottom: '0.5rem', color: '#2c3e50' },
  addBtn: {
    background: 'linear-gradient(90deg, #8d73d6, #ac8ef3)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '0.75rem',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1rem',
    boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
    transition: 'all 0.3s ease'
  },
  th: { padding: '10px', border: '1px solid #ddd' },
  row: { borderBottom: '1px solid #d1d5db' },
  actionBtn: {
    color: '#fff',
    padding: '0.4rem 0.8rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  pagination: { marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' },
  pageBtn: { padding: '0.4rem 0.8rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: '600', transition: 'all 0.3s ease' }
};

export default StaffSalaryTable;
