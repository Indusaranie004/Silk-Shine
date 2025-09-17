"use client"

import { useEffect, useState } from "react"
import { ServiceAPI } from "../Services/api"
import Navigation from "./navigation" // adjust path if needed
import "../styles/services.css"

const ServiceCards = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await ServiceAPI.getAll()

      let serviceData = []
      if (Array.isArray(response.data)) {
        serviceData = response.data
      } else if (response.data.content) {
        serviceData = response.data.content
      }
      setServices(serviceData)
    } catch (err) {
      setError("Failed to load services")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>

  return (
    <div 
      style={{ 
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", 
        minHeight: "100vh"
      }}
    >
      {/* ✅ Navbar at top */}
      <Navigation showLogout={false} />

      {/* ✅ Add padding-top so content is not hidden behind fixed navbar */}
      <div style={{ paddingTop: "100px", paddingLeft: "20px", paddingRight: "20px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "20px", textAlign: "center", color: "#2d3748" }}>
          Our Salon Services
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}>
          {services.map((srv) => (
            <div key={srv.id} style={{
              background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #cbd5e0 100%)",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)"
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"
            }}
            >
              {/* Service Image */}
              {srv.imageUrl ? (
                <img
                  src={`http://localhost:8080/api/v1.0/uploads/${srv.imageUrl}`}
                  alt={srv.serviceName}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
              ) : (
                <div style={{
                  width: "100%", height: "180px", backgroundColor: "#e2e8f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", color: "#666"
                }}>
                  No Image
                </div>
              )}

              {/* Card Content */}
              <div style={{ padding: "16px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "6px" }}>
                  {srv.serviceName || "Unnamed"}
                </h2>
                <p style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
                  {srv.category || "General"}
                </p>
                <p style={{ fontSize: "15px", marginBottom: "12px", minHeight: "40px", color: "#444" }}>
                  {srv.description || "No description available."}
                </p>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#2d3748" }}>
                    Rs. {srv.price || "N/A"}
                  </span>  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceCards
