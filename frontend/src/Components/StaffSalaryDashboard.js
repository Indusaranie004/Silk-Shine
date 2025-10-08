// src/Components/StaffSalaryDashboard.js
import React, { useEffect, useState } from "react";
import api from "../Services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const StaffSalaryDashboard = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    api.get(`/staff-salary/staff/${userId}`)
      .then((res) => {
        // Sort salaries by year and month
        const sorted = res.data.sort((a, b) => {
          if (a.year === b.year) return a.month - b.month;
          return a.year - b.year;
        });
        setSalaries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching salaries:", err);
        setLoading(false);
      });
  }, []);

  // Prepare data for graph
  const chartData = salaries.map((s) => ({
    name: `${s.month}/${s.year}`,
    totalSalary: s.totalSalary
  }));

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#8d73d6" }}>
        📈 Monthly Salary Dashboard
      </h2>

      {loading ? (
        <p>Loading salary data...</p>
      ) : salaries.length === 0 ? (
        <p>No salary records found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalSalary"
              name="Total Salary"
              stroke="#8d73d6"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StaffSalaryDashboard;
