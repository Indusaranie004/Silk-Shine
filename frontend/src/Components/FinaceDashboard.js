import React, { useEffect, useState } from "react";
import api from "../Services/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FinanceDashboard = () => {
  const [summary, setSummary] = useState({
    totalServices: 0,
    totalBookings: 0,
    totalIncome: 0,
  });
  const [trendData, setTrendData] = useState([]);
  const [filter, setFilter] = useState("date"); // date | month | year
  const [loading, setLoading] = useState(true);

  /** Fetch summary and income trend data */
  const fetchFinanceData = async () => {
    try {
      setLoading(true);
      const summaryRes = await api.get("/dashboard/summary");
      const trendRes = await api.get(`/dashboard/income-trend?filter=${filter}`);
      setSummary(summaryRes.data);
      setTrendData(trendRes.data);
    } catch (err) {
      console.error("Error fetching finance data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Finance Dashboard</h1>

      {/* Filter Selection */}
      <div style={styles.filterContainer}>
        <label style={styles.filterLabel}>Filter by:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="date">Date</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={styles.cardGrid}>
            <div style={{ ...styles.card, background: "#f3f0ff" }}>
              <h2 style={styles.cardTitle}>Total Services</h2>
              <p style={styles.cardValue}>{summary.totalServices}</p>
            </div>

            <div style={{ ...styles.card, background: "#ede9fe" }}>
              <h2 style={styles.cardTitle}>Total Bookings</h2>
              <p style={styles.cardValue}>{summary.totalBookings}</p>
            </div>

            <div style={{ ...styles.card, background: "#ded9f5ff" }}>
              <h2 style={styles.cardTitle}>Total Income</h2>
              <p style={styles.cardValue}>Rs. {summary.totalIncome?.toLocaleString()}</p>
            </div>
          </div>

          {/* Income Trend Line Graph */}
          <div style={styles.chartContainer}>
            <h2 style={styles.chartTitle}>Income Trend ({filter})</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={trendData}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                {/* UPDATED: use 'label' from backend for X axis */}
                <XAxis dataKey="label" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="#8d73d6"
                  strokeWidth={3}
                  dot={{ r: 4, stroke: "#8d73d6", fill: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#ac8ef3" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "0rem", fontFamily: "Arial, sans-serif" },
  heading: { fontSize: "1.2rem", marginBottom: "1rem", color: "#000000" },
  filterContainer: {
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  filterLabel: { fontWeight: "600", color: "#374151" },
  filterSelect: {
    padding: "0.4rem 0.8rem",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    cursor: "pointer",
    fontWeight: "500",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: "0 2px 10px rgba(141, 101, 241, 1)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  cardTitle: { color: "#141517ff", fontSize: "1rem", marginBottom: "0.5rem" },
  cardValue: { fontSize: "1.75rem", fontWeight: "700", color: "#8d73d6" },
  chartContainer: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 12px rgba(141, 115, 214, 0.2)",
    padding: "1.5rem",
  },
  chartTitle: { color: "#2c3e50", marginBottom: "0.1rem" },
};

export default FinanceDashboard;
