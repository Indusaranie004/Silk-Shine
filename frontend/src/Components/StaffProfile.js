import React, { useEffect, useState } from "react";
import { StaffService } from "../Services/api";

const StaffProfilePage = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    StaffService.getStaffById(userId)
      .then((res) => {
        setStaff(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching staff profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile...</p>;

  if (!staff) return <p>No staff profile found.</p>;

  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      padding: "30px",
      borderRadius: "15px",
      background: "linear-gradient(145deg, #f0f4ff , #8d73d6 )",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#8d73d6" }}>
        👤 Staff Profile
      </h2>

      {/*}
      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>User ID:</span>
        <span>{staff.userId}</span>
      </div> */}

      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>Name:</span>
        <span>{staff.name}</span>
      </div>

      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>Email:</span>
        <span>{staff.email}</span>
      </div>

      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>Role:</span>
        <span>{staff.role}</span>
      </div>

    {/*}
      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>Verified:</span>
        <span style={{ color: staff.isAccountVerified ? "green" : "red" }}>
          {staff.isAccountVerified ? "✅ Yes" : "❌ No"}
        </span>
      </div> */}

      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>Created At:</span>
        <span>{new Date(staff.createdAt).toLocaleString()}</span>
      </div>

      <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600", color: "#8d73d6" }}>Updated At:</span>
        <span>{new Date(staff.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default StaffProfilePage;
