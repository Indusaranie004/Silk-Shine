"use client"

import { useState, useEffect } from "react"
import Logo from "../assets/images/Logo.png"
import StaffProfilePage from "./StaffProfile"
import StaffServicesDisplay from "./StaffServicesDisplay"
import StaffProfileWithSalary from "./StaffProfileWithSalary"
import StaffSalaryDashboard from "./StaffSalaryDashboard"

function StaffDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [staffName, setStaffName] = useState("")

  // ✅ Fetch logged-in staff name from localStorage or API
  useEffect(() => {
    const storedName = localStorage.getItem("staffName")
    if (storedName) setStaffName(storedName)
  }, [])

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #cbd5e0 100%)",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    position: "fixed",
    top: 0,
    left: 0,
  }

  const topHeaderStyle = {
    width: "100%",
    height: "60px",
    background: "#ffffff",
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 24px",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  }

  const mainLayoutStyle = {
    display: "flex",
    flex: 1,
    height: "calc(100vh - 60px)",
  }

  const sidebarStyle = {
    width: "250px",
    background: "#000000",
    color: "white",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  }

  const navStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }

  const mainContentStyle = {
    flex: 1,
    padding: "32px",
    overflow: "hidden",
    maxWidth: "calc(100vw - 250px)",
  }

  // Navigation items (for staff)
  const navItems = [
    { name: "Dashboard" },
    { name: "Salary" },
    { name: "Services" },
    { name: "Appointments" },
    { name: "Profile" },
    
  ]

  // Handle navigation clicks
  function handleNavClick(navItem) {
    setActiveNav(navItem.name)
  }

  // Handle logout functionality
  function handleLogout() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  return (
    <div style={containerStyle}>
      {/* Top Header */}
      <div style={topHeaderStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={Logo}
            alt="Silk&Shine Logo"
            style={{
              maxWidth: "40px",
              maxHeight: "24px",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#2d3748",
            }}
          >
            Silk&Shine Staff Portal
          </span>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div style={mainLayoutStyle}>
        <div style={sidebarStyle}>
          <nav style={navStyle}>
            {navItems.map((item) => (
              <button
                key={item.name}
                style={{
                  padding: "12px 16px",
                  background:
                    activeNav === item.name ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  borderRadius: "8px",
                  color: activeNav === item.name ? "white" : "#a0aec0",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "14px",
                  fontWeight: activeNav === item.name ? "600" : "400",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                }}
                onClick={() => handleNavClick(item)}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Logout button at bottom */}
          <button
            style={{
              marginTop: "auto",
              padding: "12px 16px",
              background: "#8d73d6",
              borderRadius: "8px",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
              textAlign: "center",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div style={mainContentStyle}>
          {activeNav === "Dashboard" && <StaffSalaryDashboard />}
          {activeNav === "Profile" && <StaffProfilePage />}
          {activeNav === "Services" && (
            <>
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}></h2>
              <StaffServicesDisplay />
            </>
          )}
          {activeNav === "Salary" && (
            <>
              <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Salary</h2>
              <StaffProfileWithSalary />
            </>
          )}
          {activeNav === "Appointments" && (
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Appointments</h2>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default StaffDashboard
