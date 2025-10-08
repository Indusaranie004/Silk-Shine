"use client"

import { useState, useEffect } from "react"
import { ServiceAPI } from "../Services/api"
import "../styles/services.css"

const StaffServicesDisplay = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredServices, setFilteredServices] = useState([])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 4

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    if (!Array.isArray(services)) {
      setFilteredServices([])
      return
    }
    const filtered = services.filter(
      (srv) =>
        srv.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredServices(filtered)
    setCurrentPage(1) // Reset page when search changes
  }, [searchTerm, services])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await ServiceAPI.getAll()
      const serviceData = Array.isArray(response.data) ? response.data : response.data.content
      setServices(serviceData || [])
    } catch (err) {
      console.error(err)
      setError("Failed to load services from API")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredServices.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredServices.length / rowsPerPage)

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading services...</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Salon Services</h1>
      {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none"
          }}
        />
      </div>

      {/* Services List */}
      <div style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px" }}>
        <div style={{ background: "#8d73d6", color: "#fff", display: "flex", fontWeight: "bold", padding: "10px 0" }}>
          <div style={{ flex: 1, padding: "10px" }}>Name</div>
          <div style={{ flex: 1, padding: "10px" }}>Category</div>
          <div style={{ flex: 1, padding: "10px" }}>Image</div>
          <div style={{ flex: 1, padding: "10px" }}>Price</div>
          <div style={{ flex: 2, padding: "10px" }}>Description</div>
        </div>

        {currentRows.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {searchTerm ? "No services found matching your search." : "No services available."}
          </div>
        ) : (
          currentRows.map((srv) => (
            <div key={srv.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
              <div style={{ flex: 1 }}>{srv.serviceName || "N/A"}</div>
              <div style={{ flex: 1 }}>{srv.category || "N/A"}</div>
              <div style={{ flex: 1 }}>
                {srv.imageUrl ? (
                  <img
                    src={`http://localhost:8080/api/v1.0/uploads/${srv.imageUrl}`}
                    alt={srv.serviceName}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                  />
                ) : (
                  "No Image"
                )}
              </div>
              <div style={{ flex: 1 }}>{srv.price || "N/A"}</div>
              <div style={{ flex: 2 }}>{srv.description || "N/A"}</div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "5px" }}>
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
                transition: "all 0.3s ease"
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

export default StaffServicesDisplay
