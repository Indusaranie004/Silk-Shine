"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserService } from "../Services/api"

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
    if (success) setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await UserService.create(formData)
      console.log("Registration successful:", response.data)

      setSuccess("Registration successful! Redirecting to login...")
      setLoading(false)

      setTimeout(() => {
        navigate("/login")
      }, 1000)
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err)
      setError("Registration failed. Please try again.")
      setLoading(false)
    }
  }

  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #cbd5e0 100%)",
      padding: "80px 40px 60px 40px",
      fontFamily: "Arial, sans-serif",
      margin: 0,
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "24px",
      padding: "24px",
      width: "100%",
      maxWidth: "360px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#2d3748",
      margin: "0 0 20px 0",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#2d3748",
      margin: 0,
    },
    input: {
      padding: "10px 16px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      background: "#f8f9fa",
      color: "#2d3748",
      outline: "none",
    },
    select: {
      padding: "10px 16px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      background: "#f8f9fa",
      color: "#2d3748",
      textAlign: "center",
      outline: "none",
    },
    button: {
      background: "#000000",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "50px",
      fontSize: "16px",
      fontWeight: "600",
      marginTop: "8px",
      cursor: "pointer",
    },
    loginLink: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
      color: "#4a5568",
    },
    loginAnchor: {
      color: "#9877dfff",
      textDecoration: "none",
      fontWeight: "bold",
    },
    message: {
      marginTop: "10px",
      fontSize: "14px",
      textAlign: "center",
      fontWeight: "500",
    },
    error: {
      color: "#c53030",
    },
    success: {
      color: "#2f855a",
    },
    loading: {
      color: "#8b5cf6", // violet (#8b5cf6)
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create an Account</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="role" style={styles.label}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={styles.select}
              required
            >
              <option value="">Select a role</option>
              <option value="CLIENT">Client</option>
              {/*<option value="ADMIN">Admin</option> */}
              {/*<option value="STAFF">Staff</option> */}
            </select>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        {loading && <div style={{ ...styles.message, ...styles.loading }}>Processing...</div>}
        {error && <div style={{ ...styles.message, ...styles.error }}>{error}</div>}
        {success && <div style={{ ...styles.message, ...styles.success }}>{success}</div>}

        <div style={styles.loginLink}>
          Already have an account?{" "}
          <a href="/login" style={styles.loginAnchor}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}

export default Registration
