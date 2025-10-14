import React, { useEffect, useState } from "react";
import api from "../Services/api";
import Navigation from "./navigation";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact/all"); // API endpoint
      setContacts(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await api.delete(`/contact/delete/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
      alert("✅ Contact deleted successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete contact");
    }
  };

  // Filter contacts by search ID
  const filteredContacts = searchId
    ? contacts.filter((c) => c.id.toLowerCase().includes(searchId.toLowerCase()))
    : contacts;

  // Pagination calculations
  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>;
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <Navigation showLogout={true} />

      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>All Contact Messages</h1>

      
      {/* Search Bar 
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        /> 
      </div> */}

      

      {/* Contact Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px" }}>
          <thead>
            <tr style={{ background: "#8d73d6", color: "#fff" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Message</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "15px" }}>No contacts found.</td>
              </tr>
            ) : (
              paginatedContacts.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{contact.id}</td>
                  <td style={{ padding: "10px" }}>{contact.name}</td>
                  <td style={{ padding: "10px" }}>{contact.email}</td>
                  <td style={{ padding: "10px" }}>{contact.phoneNumber}</td>
                  <td style={{ padding: "10px" }}>{contact.description}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination Buttons */}
      {totalPages > 1 && (
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "6px" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                backgroundColor: currentPage === page ? "#8b5cf6" : "#f3f4f6",
                color: currentPage === page ? "#fff" : "#374151",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContact;
