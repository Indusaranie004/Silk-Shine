"use client"

import { useState, useEffect } from "react"
import { StaffService } from "../Services/api" // 👈 fixed path (lowercase 'services')
import "../styles/staff.css"

const StaffContent = () => {
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
    return <div className="loading-container">Loading staff members...</div>
  }

  return (
    <div className="staff-content">
      <h1 className="staff-title">Staff Members</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="search-container">
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
            placeholder="Search staff..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="staff-list">
        <div className="list-header">
          <div className="header-name">Name</div>
          <div className="header-email">Email</div>
          <div className="header-actions"></div>
        </div>

        <div className="staff-rows">
          {filteredStaff.length === 0 ? (
            <div className="no-staff">
              {searchTerm
                ? "No staff members found matching your search."
                : "No staff members available."}
            </div>
          ) : (
            filteredStaff.map((member) => (
              <div key={member.userId} className="staff-row">
                <div className="staff-name">{member.name || "N/A"}</div>
                <div className="staff-email">{member.email || "N/A"}</div>
                <div className="staff-actions">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(member.userId)}
                    title="Delete staff member"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
    </div>
  )
}

export default StaffContent
