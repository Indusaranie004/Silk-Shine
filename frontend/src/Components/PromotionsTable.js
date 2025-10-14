// src/Components/PromotionsTable.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';

const PromotionsTable = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch all promotions
  const fetchPromotions = async () => {
    try {
      const response = await api.get('/promotions/all');
      setPromotions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching promotions:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  // Delete promotion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this promotion?')) return;
    try {
      await api.delete(`/promotions/delete/${id}`);
      setPromotions(promotions.filter((p) => p.id !== id));
      alert('✅ Promotion deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error.response || error.message);
      alert('❌ Failed to delete promotion. ' + (error.response?.data?.message || ''));
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = promotions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(promotions.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Promotional Messages</h1>

      {/* Send Promotional Message Button */}
      <button
        style={styles.addBtn}
        onClick={() => navigate('/promotions-form')}
      >
        + Send Promotional Message
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px" }}>
            <thead>
              <tr style={{ background: "#8d73d6", color: "#fff" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Content</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Audience</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sent At</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Success</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((promo) => (
                <tr key={promo.id} style={styles.row}>
                  <td>{promo.id}</td>
                  <td>{promo.title}</td>
                  <td>{promo.content}</td>
                  <td>{promo.targetAudience}</td>
                  <td>{promo.sentAt}</td>
                  <td>{promo.sentSuccessfully ? '✅' : '❌'}</td>
                  <td>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(promo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
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
                  onClick={() => handlePageChange(page)}
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
  container: { padding: '2rem', fontFamily: 'Arial, sans-serif' },
  heading: { fontSize: '1.75rem', marginBottom: '1rem', color: '#2c3e50' },
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
  table: { width: '100%', borderCollapse: 'collapse' },
  row: { borderBottom: '1px solid #d1d5db' },
  deleteBtn: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  pagination: {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center'
  },
  pageBtn: {
    padding: '0.4rem 0.8rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }
};

export default PromotionsTable;
