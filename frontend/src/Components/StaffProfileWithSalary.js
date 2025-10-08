// src/Components/StaffMemberSalary.js
import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { jsPDF } from "jspdf";

const StaffMemberSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [loadingSalary, setLoadingSalary] = useState(true);
  const [staffName, setStaffName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    // Fetch staff salaries
    api.get(`/staff-salary/staff/${userId}`)
      .then((res) => {
        setSalaries(res.data);
        setLoadingSalary(false);
        if (res.data.length > 0) setStaffName(res.data[0].staffName || "");
      })
      .catch((err) => {
        console.error("Error fetching salaries:", err);
        setLoadingSalary(false);
      });
  }, []);

  const handleDownloadSlip = (salary) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    // doc.text("💰 Salary Slip", 297.5, 40, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const startY = 80;
    const lineHeight = 20;

    doc.text(`Staff Name: ${salary.staffName || staffName}`, 40, startY);
    doc.text(`Staff ID: ${salary.staffId}`, 40, startY + lineHeight);
    doc.text(`Month / Year: ${salary.month} / ${salary.year}`, 40, startY + 2 * lineHeight);
    doc.text(`Daily Payment: ${salary.dailyPayment}`, 40, startY + 3 * lineHeight);
    doc.text(`Working Days: ${salary.workingDays}`, 40, startY + 4 * lineHeight);
    doc.text(`Bonus: ${salary.bonus}`, 40, startY + 5 * lineHeight);
    doc.text(`ETF %: ${salary.etfPercentage}   ETF Amount: ${salary.etfAmount}`, 40, startY + 6 * lineHeight);
    doc.text(`EPF %: ${salary.epfPercentage}   EPF Amount: ${salary.epfAmount}`, 40, startY + 7 * lineHeight);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Salary: ${salary.totalSalary}`, 40, startY + 9 * lineHeight);

    if (salary.notes) {
      doc.setFont("helvetica", "normal");
      doc.text(`Notes: ${salary.notes}`, 40, startY + 10 * lineHeight);
    }

    // Draw a border box
    doc.setLineWidth(1);
    doc.rect(30, 60, 540, startY + 10 * lineHeight - 50);

    doc.save(`SalarySlip_${salary.staffId}_${salary.month}_${salary.year}.pdf`);
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#8d73d6" }}>
        💰 My Salary Records
      </h2>

      {loadingSalary ? (
        <p>Loading salaries...</p>
      ) : salaries.length === 0 ? (
        <p>No salary records found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px" }}>
          <thead>
            <tr style={{ background: "#8d73d6", color: "#fff" }}>
              <th style={styles.th}>Month</th>
              <th style={styles.th}>Year</th>
              <th style={styles.th}>Daily Payment</th>
              <th style={styles.th}>Working Days</th>
              <th style={styles.th}>Bonus</th>
              <th style={styles.th}>ETF Amount</th>
              <th style={styles.th}>EPF Amount</th>
              <th style={styles.th}>Total Salary</th>
              <th style={styles.th}>Notes</th>
              <th style={styles.th}>Download</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #d1d5db", textAlign: "center" }}>
                <td>{s.month}</td>
                <td>{s.year}</td>
                <td>{s.dailyPayment}</td>
                <td>{s.workingDays}</td>
                <td>{s.bonus}</td>
                <td>{s.etfAmount}</td>
                <td>{s.epfAmount}</td>
                <td>{s.totalSalary}</td>
                <td>{s.notes}</td>
                <td>
                  <button
                    onClick={() => handleDownloadSlip(s)}
                    style={{
                      backgroundColor: "#10b981",
                      color: "#fff",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  th: { padding: "10px", border: "1px solid #ddd" }
};

export default StaffMemberSalary;
