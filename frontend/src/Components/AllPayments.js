// src/Components/AllPayments.js
import React, { useEffect, useState } from "react";
import api from "../Services/api";

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("/payments");
        setPayments(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/payments/${id}`);
      setPayments(payments.filter((p) => p.id !== id));
      setShowModal(false);
      alert("Payment deleted successfully");
    } catch (error) {
      alert("Failed to delete payment");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESS":
        return "#38a169"; // green
      case "FAILED":
        return "#e53e3e"; // red
      case "PENDING":
        return "#dd6b20"; // orange
      case "REFUNDED":
        return "#3182ce"; // blue
      default:
        return "#718096"; // gray
    }
  };

  // Filter payments by ID search
  const filteredPayments = payments.filter((p) =>
    p.id.toString().includes(search)
  );

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPayments.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Styles (keep existing)
  const containerStyle = {
    padding: "30px",
    //background: "#f7fafc",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  };

  const thTdStyle = {
    padding: "14px",
    textAlign: "left",
    borderBottom: "1px solid #e2e8f0",
  };

  const headerStyle = {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#2d3748",
  };

  const rowHover = {
    transition: "all 0.2s",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}> All Payments </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by ID..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // reset page on search
        }}
        style={{
          padding: "8px 12px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #cbd5e0",
          width: "200px",
        }}
      />

      {loading ? (
        <p>Loading payments...</p>
      ) : currentRows.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px" }}>
            <thead style={{ backgroundColor: "#edf2f7" }}>
              <tr style={{ background: "#8d73d6", color: "#fff" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>User</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Booking</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Amount</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Method</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Transaction</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((p) => {
                const [date, time] = p.paymentDate.split("T") || ["", ""];
                return (
                  <tr
                    key={p.id}
                    style={rowHover}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f4f8")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    <td style={thTdStyle}>{p.id}</td>
                    <td style={thTdStyle}>{p.userId}</td>
                    <td style={thTdStyle}>{p.bookingName}</td>
                    <td style={thTdStyle}>Rs. {p.amount}</td>
                    <td style={thTdStyle}>{date}</td>
                    <td style={thTdStyle}>{time?.slice(0, 5)}</td>
                    <td style={{ ...thTdStyle, color: getStatusColor(p.status) }}>
                      {p.status}
                    </td>
                    <td style={thTdStyle}>{p.method}</td>
                    <td style={thTdStyle}>{p.transactionId?.substring(0, 10)}...</td>
                    <td style={thTdStyle}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#e53e3e",
                          fontSize: "18px",
                          cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#c53030")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#e53e3e")}
                        onClick={() => {
                          setDeleteId(p.id);
                          setShowModal(true);
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "5px" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: currentPage === page ? "#8d73d6" : "#f3f4f6",
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

      {/* Delete Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h2>Delete Payment</h2>
            <p>Are you sure you want to delete this payment? This action cannot be undone.</p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#e53e3e",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPayments;
