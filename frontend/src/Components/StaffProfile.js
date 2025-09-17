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
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "12px" }}>
      <h2>👤 Staff Profile</h2>
      <p><strong>User ID:</strong> {staff.userId}</p>
      <p><strong>Name:</strong> {staff.name}</p>
      <p><strong>Email:</strong> {staff.email}</p>
      <p><strong>Role:</strong> {staff.role}</p>
      <p><strong>Verified:</strong> {staff.isAccountVerified ? "✅ Yes" : "❌ No"}</p>
      <p><strong>Created At:</strong> {new Date(staff.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(staff.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default StaffProfilePage;
