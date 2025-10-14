"use client"

import { useEffect, useState } from "react"
import { ServiceAPI } from "../Services/api"
import Navigation from "./navigation"
import "../styles/services.css"
import BookingForm from "./BookingForm"; // ← ADDED


const ServiceCards = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false); // ← ADDED
  const [selectedService, setSelectedService] = useState(null); // ← ADDED

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

  const handleBook = (service) => { // ← ADDED
    setSelectedService(service);
    setShowBookingForm(true);
  };

  if (loading) return <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
  if (error) return <div style={{ color: "red", textAlign: "center" }}>{error}</div>

  return (
    <div 
      style={{ 
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", 
        minHeight: "100vh"
      }}
    >
      <Navigation showLogout={true} />
       
         
{/* ✅ My Bookings (Left) & My Payments (Right) */}
{/* My Bookings - Left Side */}
<div style={{
  position: 'fixed',
  top: '70px',
  left: '120px',
  zIndex: '1000'
}}>
  <button
    onClick={() => window.location.href = '/my-bookings'}
    style={{
      backgroundColor: '#ac8ef3',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      transition: 'background 0.2s'
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8d73d6'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ac8ef3'}
  >
    My Bookings
  </button>
</div>

{/* My Payments - Right Side */}
<div style={{
  position: 'fixed',
  top: '70px',
  right: '120px',
  zIndex: '1000'
}}>
  <button
    onClick={() => window.location.href = '/my-payments'}
    style={{
      backgroundColor: '#ac8ef3',
      color: 'white',
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      transition: 'background 0.2s'
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8d73d6'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ac8ef3'}
  >
    My Payments
  </button>
</div>








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
                  <button
                    style={{
                      backgroundColor: "#ac8ef3",
                      color: "white",
                      padding: "8px 14px",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#8d73d6"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ac8ef3"}
                    onClick={() => handleBook(srv)} // ← CHANGED
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ SHOW BOOKING FORM IF OPEN */}
        {showBookingForm && selectedService && (
          <BookingForm
            service={selectedService}
            onClose={() => setShowBookingForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default ServiceCards
