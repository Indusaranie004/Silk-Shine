"use client"

import { useState, useEffect } from "react"
import { ClientService } from "../Services/api"
import "../styles/customer.css"

const CustomersContent = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  useEffect(() => {
    fetchCustomers()
  }, [])

  useEffect(() => {
    if (!customers) {
      setFilteredCustomers([])
      return
    }

    const filtered = customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCustomers(filtered)
    setCurrentPage(1) // Reset to first page on search
  }, [searchTerm, customers])

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await ClientService.getAllClients()
      setCustomers(response.data || [])
    } catch (err) {
      console.error("Error fetching customers:", err)
      setError("Failed to load customers from API")
      setCustomers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (customerId) => {
    try {
      await ClientService.deleteClient(customerId)
      setCustomers((prev) => prev.filter((customer) => customer.userId !== customerId))
      console.log("Customer deleted successfully:", customerId)
    } catch (err) {
      console.error("Error deleting customer:", err)
      alert("Failed to delete customer")
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          color: "#4a5568",
        }}
      >
        Loading customers...
      </div>
    )
  }

  // 🔹 Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage)

  return (
    <div
      className="customers-content"
      style={{
        width: "100%",
        maxWidth: "calc(100vw - 280px)",
        overflow: "hidden",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "calc(100vh - 120px)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          color: "#2d3748",
          margin: "0 0 10px 0",
          flexShrink: 0,
        }}
      >
        Customers
      </h1>

      {error && (
        <div
          style={{
            backgroundColor: "#fed7d7",
            color: "#c53030",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "1px solid #feb2b2",
          }}
        >
          {error}
        </div>
      )}

      <div className="search-container" style={{ width: "100%", maxWidth: "600px", flexShrink: 0 }}>
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div
        className="customer-list"
        style={{
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          maxHeight: "calc(100vh - 200px)",
          overflow: "hidden",
        }}
      >
        <div
          className="list-header"
          style={{
            display: "flex",
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "#f8f9fa",
            flexShrink: 0,
          }}
        >
          <div
            className="header-name"
            style={{
              flex: "1 1 40%",
              minWidth: "120px",
              fontWeight: "600",
              color: "#4a5568", 
            }}
          >
            Name
          </div>
          <div
            className="header-email"
            style={{
              flex: "1 1 50%",
              minWidth: "150px",
              fontWeight: "600",
              color: "#4a5568",
            }}
          >
            Email
          </div>
          <div
            className="header-actions"
            style={{
              flex: "0 0 60px",
              textAlign: "center",
            }}
          ></div>
        </div>

        <div
          className="customer-rows"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            minHeight: 0,
          }}
        >
          {currentRows.length === 0 ? (
            <div
              className="empty-state"
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#4a5568",
              }}
            >
              {searchTerm ? "No customers found matching your search." : "No customers available."}
            </div>
          ) : (
            currentRows.map((customer) => (
              <div
                key={customer.userId}
                className="customer-row"
                style={{
                  display: "flex",
                  padding: "16px 20px",
                  borderBottom: "1px solid #e2e8f0",
                  alignItems: "center",
                  minHeight: "60px",
                }}
              >
                <div
                  className="customer-name"
                  style={{
                    flex: "1 1 40%",
                    minWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingRight: "10px",
                    color: "#2d3748",
                    fontWeight: "500",
                  }}
                >
                  {customer.name || "N/A"}
                </div>
                <div
                  className="customer-email"
                  style={{
                    flex: "1 1 50%",
                    minWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    paddingRight: "10px",
                    color: "#4a5568",
                  }}
                >
                  {customer.email || "N/A"}
                </div>
                <div
                  className="customer-actions"
                  style={{
                    flex: "0 0 60px",
                    textAlign: "center",
                  }}
                >
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(customer.userId)}
                    title="Delete customer"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#e53e3e",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#fed7d7"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2,2h4a2,2 0 0,1,2,2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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
                transition: 'all 0.3s ease'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomersContent
