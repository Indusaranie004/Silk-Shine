import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const GuestContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact/create", formData); // API call
      alert("✅ Message submitted successfully!");
      setFormData({ name: "", email: "", phoneNumber: "", description: "" });
      navigate("/"); // Redirect to Home after submit
    } catch (error) {
      console.error("❌ Error submitting message:", error);
      alert("❌ Failed to submit your message. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate to Home on cancel
  };

  return (
    <div className="contact-form-overlay">
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Your Message"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>

          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Back to Home
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .contact-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .contact-form {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          width: 90%;
          max-width: 480px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          text-align: center;
          animation: fadeIn 0.3s ease-in-out;
        }
        .contact-form h2 { color: #333; margin-bottom: 20px; }
        .contact-form form { display: flex; flex-direction: column; gap: 12px; }
        .contact-form input, .contact-form textarea {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 15px;
          outline: none;
          transition: border 0.3s ease;
        }
        .contact-form input:focus, .contact-form textarea:focus { border-color: #ac8ef3; }
        .form-actions {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 20px;
        }
        .form-actions button {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .form-actions button[type="submit"] { background-color: #8d73d6; color: white; }
        .form-actions button[type="submit"]:hover { background-color: #ac8ef3; }
        .cancel-btn { background-color: #2d3748; color: white; }
        .cancel-btn:hover { background-color: #2d3748e3; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default GuestContactUs;
