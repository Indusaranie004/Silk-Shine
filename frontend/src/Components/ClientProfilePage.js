import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import { ClientProfileAPI } from "../Services/api";

export default function ClientProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await ClientProfileAPI.getProfile(userId);
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile. Please try again.");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await ClientProfileAPI.updateProfile(userId, formData);
      setProfile(res.data);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      await ClientProfileAPI.deleteProfile(userId);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Error deleting profile:", err);
      setError("Failed to delete profile. Please try again.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(to right, #edf2f7, #cfd8e9ff)", // vibrant boat-race gradient
      paddingTop: "80px", // space for fixed navbar
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    container: {
      maxWidth: "600px",
      margin: "20px",
      padding: "30px",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #d2d7ffff 0%, #fff 100%)",
      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "2rem",
      background: "linear-gradient(to right, #2d3748, #2d3748)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "bold",
    },
    formControl: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "600",
      color: "#6b21a8",
      fontSize: "1rem",
    },
    input: {
      padding: "10px 15px",
      borderRadius: "12px",
      border: "2px solid #6b21a8",
      outline: "none",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    inputHover: {
      borderColor: "#d946ef",
      boxShadow: "0 0 10px rgba(217, 70, 239, 0.5)",
    },
    button: {
      padding: "12px 25px",
      border: "none",
      borderRadius: "50px",
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginRight: "10px",
    },
    saveBtn: {
      background: "linear-gradient(90deg, #7752ddff, #8d73d6)",
      color: "white",
    },
    editBtn: {
      background: "linear-gradient(90deg, #7752ddff, #8d73d6)",
      color: "white",
    },
    cancelBtn: {
      background: "#b91c1c",
      color: "#fff",
    },
    deleteBtn: {
      background: "linear-gradient(90deg, #2d3748, #2d3748e3)",
      color: "white",
      marginTop: "20px",
    },
    error: {
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "10px 15px",
      borderRadius: "12px",
      textAlign: "center",
      marginBottom: "15px",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <Navigation showLogout={true} />

      {/* Profile Container */}
      {error ? (
        <div style={styles.container}>
          <div style={styles.error}>{error}</div>
          <button
            style={{ ...styles.button, ...styles.editBtn }}
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      ) : !profile ? (
        <h2 style={{ textAlign: "center", marginTop: "150px" }}>
          Loading profile...
        </h2>
      ) : (
        <div style={styles.container}>
          <h1 style={styles.heading}>My Profile</h1>

          <div style={styles.formControl}>
            <label style={styles.label}>Name</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              readOnly={!editMode}
              style={styles.input}
              onFocus={(e) =>
                (e.target.style = { ...styles.input, ...styles.inputHover })
              }
              onBlur={(e) => (e.target.style = styles.input)}
            />
          </div>

          <div style={styles.formControl}>
            <label style={styles.label}>Email</label>
            <input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              readOnly={!editMode}
              style={styles.input}
              onFocus={(e) =>
                (e.target.style = { ...styles.input, ...styles.inputHover })
              }
              onBlur={(e) => (e.target.style = styles.input)}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            {editMode ? (
              <>
                <button
                  style={{ ...styles.button, ...styles.saveBtn }}
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  style={{ ...styles.button, ...styles.cancelBtn }}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                style={{ ...styles.button, ...styles.editBtn }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}

            <button
              style={{ ...styles.button, ...styles.deleteBtn }}
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
