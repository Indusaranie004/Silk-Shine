"use client"

import { useState } from "react"
import Logo from "../assets/images/Logo.png";
// Import content components
import CustomersContent from './customer'
import StaffContent from "./staff";
import ServicesContent from "./services";
import AppointmentsContent from "./appointments";
import AllPayments from "./AllPayments";
import PromotionsTable from "./PromotionsTable";
import AllContact from "./AllContact";
import FinanceDashboard from "./FinaceDashboard";
import StaffSalaryTable from "./StaffSalaryTable";


function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard")

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
    justifyContent: "space-between",
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

  const mainContentStyle = {
    flex: 1,
    padding: "32px",
    overflow: "hidden",
    maxWidth: "calc(100vw - 250px)",
  }

  // Navigation items
  const navItems = [
    { name: "Dashboard", route: "/finance-dashboard", action: "navigate" },
    { name: "Customers", route: "/customers", action: "navigate" },
    { name: "Staff", route: "/staff", action: "navigate" },
    { name: "Services", route: "/services", action: "navigate" },
    { name: "Appointments", route: "/appointments", action: "navigate" },
    { name: "Payments", route: "/all-payments", action: "navigate" },
    { name: "Promotions", route: "/promotions/all", action: "navigate" },
    { name: "Contact Us", route: "/all-contacts", action: "navigate" },
    { name: "Staff Salary", route: "/staff-salaries", action: "navigate" },
    { name: "Work Allocation", route: "/work-allocation", action: "navigate" }
    
  ]

  // Handle navigation clicks
  function handleNavClick(navItem) {
    setActiveNav(navItem.name)
  }

  // Handle logout functionality
  function handleLogout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userSession')
    sessionStorage.clear()
    window.location.href = '/'
  }

  // Handle logo click
  function handleLogoClick() {
    setActiveNav("Dashboard")
    window.location.href = '/dashboard'
  }

  return (
    <div style={containerStyle}>
      {/* Top Header */}
      <div style={topHeaderStyle}>
        <div 
          style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
          onClick={handleLogoClick}
        >
          <img
            src={Logo}
            alt="Silk&Shine Logo"
            style={{
              maxWidth: "40px",
              maxHeight: "24px",
              objectFit: "contain",
              transition: "all 0.2s ease",
            }}
          />
          <span style={{ 
            fontSize: "18px", 
            fontWeight: "600", 
            color: "#2d3748",
          }}>
            Silk&Shine
          </span>
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 0.2s ease",
            background: "#000000",
            color: "white",
            border: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Sidebar + Content */}
      <div style={mainLayoutStyle}>
        <div style={sidebarStyle}>
          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            {navItems.map((item) => (
              <button
                key={item.name}
                style={{
                  padding: "12px 16px",
                  background: activeNav === item.name ? "rgba(255, 255, 255, 0.1)" : "transparent",
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
        </div>

        {/* Main Content */}
        <div style={mainContentStyle}>
          {activeNav === "Dashboard" && (
            <FinanceDashboard />
          )}
          
          {activeNav === "Customers" && <CustomersContent />}
          {activeNav === "Staff" && <StaffContent />}
          {activeNav === "Services" && <ServicesContent />}
           {activeNav === "Appointments" && <AppointmentsContent />}{/* ← ADD THIS */}
           {activeNav === "Payments" && <AllPayments />}
           {activeNav === "Promotions" && <PromotionsTable />}
            {activeNav === "Contact Us" && <AllContact />}
            {activeNav === "Staff Salary" && <StaffSalaryTable />}

        </div>
      </div>
    </div>
  )
}

export default Dashboard
