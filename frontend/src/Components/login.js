"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserService } from "../Services/api"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await UserService.login({
      email: formData.email,
      password: formData.password,
    });

    console.log("Login success:", response.data);

    // ✅ Store UUID userId and token separately
    localStorage.setItem("userId", response.data.userId); // UUID string
    localStorage.setItem("token", response.data.token);   // JWT token if any

    setError("");

    // Role-based navigation
    const role = response.data.role;
    if (role === "ADMIN") navigate("/dashboard_admin");
    else if (role === "STAFF") navigate("/dashboard_staff");
    else if (role === "CLIENT") navigate("/Home");
    else navigate("/login");

  } catch (err) {
    console.error("Login failed:", err);
    setError("Incorrect email or password");
  }
};


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
    errorMessage: {
      background: "#fed7d7",
      color: "#c53030",
      fontSize: "14px",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #feb2b2",
      textAlign: "center",
      marginTop: "4px",
      fontWeight: "500",
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
    forgotPassword: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
    },
    forgotLink: {
      color: "#553c9a",
      textDecoration: "none",
      fontWeight: "500",
    },
    signupLink: {
      textAlign: "center",
      marginTop: "16px",
      fontSize: "14px",
      color: "#4a5568",
    },
    signupAnchor: {
      color: "#9877dfff",
      textDecoration: "none",
      fontWeight: "bold",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back!</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
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

          {error && <div style={styles.errorMessage}>{error}</div>}

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <div style={styles.forgotPassword}>
          <a href="/ForgotPW" style={styles.forgotLink}>
            Forgot Password?
          </a>
        </div>

        <div style={styles.signupLink}>
          Don't have an Account?{" "}
          <a href="/register" style={styles.signupAnchor}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
