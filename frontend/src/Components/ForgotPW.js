"use client"

import { useState } from "react"
import { UserService } from "../Services/api"

const ForgotPW = () => {
  const [step, setStep] = useState(1) // 1 = email, 2 = OTP + new password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    try {
      await UserService.forgotPassword(formData.email)
      console.log("Email sent successfully to:", formData.email)
      setStep(2) // Move to OTP form
    } catch (error) {
      console.error("Error sending email:", error)
      alert("Failed to send email. Please try again.")
      // Handle error (show message to user)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      const resetData = {
        email: formData.email, // Use existing email
        newPassword: formData.newPassword,
        otp: formData.otp
      }

      const response = await UserService.resetPassword(resetData)

      // ✅ Check if backend returned success
      if (response.status === 200) {
        alert(response.data?.message || "Password reset successfully ✅") // ✅ fixed success alert
        window.location.href = "/login" // ✅ redirect to login page
      } else {
        alert(response.data?.message || "Something went wrong") // ✅ handle unexpected response
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      const errorMessage =
        error.response?.data?.message || "Password reset failed"
      alert(errorMessage) // ✅ show proper error only if truly failed
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
      width: "100%",
    },
    backToLogin: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
      color: "#4a5568",
    },
    backLink: {
      color: "#9877dfff",
      textDecoration: "none",
      fontWeight: "500",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {step === 1 ? "Forgot your password?" : "Reset Password"}
        </h1>

        {step === 1 ? (
          <form onSubmit={handleSendEmail} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email
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

            <button type="submit" style={styles.button}>
              Send Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="otp" style={styles.label}>
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="newPassword" style={styles.label}>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.button}>
              Reset Password
            </button>
          </form>
        )}

        <div style={styles.backToLogin}>
          <a href="/login" style={styles.backLink}>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForgotPW