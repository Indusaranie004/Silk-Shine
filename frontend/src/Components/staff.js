"use client"

import { useState, useEffect } from "react"
import { StaffService } from "../Services/api"
import { useNavigate } from "react-router-dom"
import "../styles/staff.css"

const StaffContent = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredStaff, setFilteredStaff] = useState([])

  useEffect(() => {
    fetchStaff()
  }, [])

  useEffect(() => {
    if (!Array.isArray(staff)) {
      setFilteredStaff([])
      return
    }

    const filtered = staff.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredStaff(filtered)
  }, [searchTerm, staff])

  const fetchStaff = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await StaffService.getAllStaff()
      console.log("Staff API response:", response.data)

      let staffData = []
      if (Array.isArray(response.data)) {
        staffData = response.data
      } else if (response.data?.staff) {
        staffData = response.data.staff
      } else if (response.data?.content) {
        staffData = response.data.content
      }

      setStaff(staffData)
    } catch (err) {
      console.error("Error fetching staff:", err.response?.data || err.message)
      setError("Failed to load staff from API")
      setStaff([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (staffId) => {
    try {
      await StaffService.deleteStaff(staffId)
      setStaff((prev) => prev.filter((member) => member.userId !== staffId))
      console.log("Staff member deleted successfully:", staffId)
    } catch (err) {
      console.error("Error deleting staff member:", err)
      alert("Failed to delete staff member")
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading staff members...</div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Staff Members</h1>

      {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

      {/* Search bar + Register button container */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "12px" }}>
        {/* Search Input */}
        <div style={{ position: "relative", flex: 1 }}>
          <svg
            style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)" }}
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
            placeholder="Search staff..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        {/* Register New Staff button */}
        <button
          style={{
            backgroundColor: "#4a90e2",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357abd")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a90e2")}
          onClick={() => navigate("/staffregister")}
        >
          Register New Staff
        </button>
      </div>

      {/* Staff List */}
      <div>
        <div style={{ display: "flex", fontWeight: "bold", padding: "10px 0", borderBottom: "1px solid #ccc" }}>
          <div style={{ flex: 1 }}>Name</div>
          <div style={{ flex: 1 }}>Email</div>
          <div style={{ width: "80px" }}>Actions</div>
        </div>

        {filteredStaff.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {searchTerm
              ? "No staff members found matching your search."
              : "No staff members available."}
          </div>
        ) : (
          filteredStaff.map((member) => (
            <div
              key={member.userId}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div style={{ flex: 1 }}>{member.name || "N/A"}</div>
              <div style={{ flex: 1 }}>{member.email || "N/A"}</div>
              <div style={{ width: "80px" }}>
                {/* 🔹 Trash icon button for delete */}
                <button
                  onClick={() => handleDelete(member.userId)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#c53030",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Delete staff member"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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
  )
}

export default StaffContent
