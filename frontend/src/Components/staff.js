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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5

  // 🔹 Update form states
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(null)
  const [updateData, setUpdateData] = useState({ name: "", email: "" })

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
    setCurrentPage(1) // Reset to first page on search
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

  // 🔹 Open update form
  const openUpdateForm = (member) => {
    setCurrentStaff(member)
    setUpdateData({ name: member.name || "", email: member.email || "" })
    setShowUpdateForm(true)
  }

  // 🔹 Update form input change
  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value })
  }

  // 🔹 Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      await StaffService.updateStaff(currentStaff.userId, updateData)
      setStaff((prev) =>
        prev.map((m) =>
          m.userId === currentStaff.userId ? { ...m, ...updateData } : m
        )
      )
      setShowUpdateForm(false)
      setCurrentStaff(null)
    } catch (err) {
      console.error("Error updating staff:", err)
      alert("Failed to update staff member")
    }
  }

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading staff members...</div>
  }

  // 🔹 Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredStaff.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredStaff.length / rowsPerPage)

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Staff Members</h1>

      {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

      {/* Search bar + Register button */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "12px" }}>
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

        <button
          style={{
            backgroundColor: "#8b5cf6",
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
          onClick={() => navigate("/staffregister")}
        >
          Register New Staff
        </button>
      </div>

      {/* Staff List */}
      <div style={{ background: "#fff" }}>
        <div style={{ background: "#8d73d6", color: "#fff", display: "flex", fontWeight: "bold", padding: "10px " }}>
          <div style={{ flex: 1 }}>Name</div>
          <div style={{ flex: 1 }}>Email</div>
          <div style={{ width: "120px" }}>Actions</div>
        </div>

        {currentRows.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {searchTerm
              ? "No staff members found matching your search."
              : "No staff members available."}
          </div>
        ) : (
          currentRows.map((member) => (
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
              <div style={{ width: "120px", display: "flex", gap: "8px" }}>
                {/* ✏️ Update button */}
                <button
                  onClick={() => openUpdateForm(member)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8b5cf6",
                  }}
                  title="Edit staff member"
                >
                  ✏️
                </button>

                {/* 🗑️ Delete button */}
                <button
                  onClick={() => handleDelete(member.userId)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#c53030",
                  }}
                  title="Delete staff member"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Pagination Buttons */}
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
                transition: 'all 0.3s ease'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* 🔹 Popup Update Form */}
      {showUpdateForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #cbd5e0 100%)",
              padding: "20px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
              Update Staff
            </h2>

            <form onSubmit={handleUpdateSubmit}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Name</label>
                <input
                  type="text"
                  name="name"
                  value={updateData.name}
                  onChange={handleUpdateChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", marginBottom: "4px" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={updateData.email}
                  onChange={handleUpdateChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  style={{
                    backgroundColor: "#e53e3e",
                    color: "white",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#8b5cf3",
                    color: "white",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffContent
