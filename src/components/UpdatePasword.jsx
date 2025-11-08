import React, { useState } from "react";
import axios from "axios";
import "./updatePassword.css";

export default function UpdatePasswordForm() {
  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("jwt");
      console.log(token);

      await axios.patch(
        "http://127.0.0.1:3000/api/v1/users/updateMyPassword",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Password updated successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      const errMsg = err.response?.data?.message || "Something went wrong!";
      setError(`❌ ${errMsg}`);
    }
  };

  return (
    <div className="update-password-container">
      <h2 className="update-password-title">Update Your Password</h2>

      <form onSubmit={handleSubmit} className="update-password-form">
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input
            type="password"
            name="passwordCurrent"
            value={formData.passwordCurrent || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formData.passwordConfirm || ""}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-submit">
          Update Password
        </button>
      </form>

      {message && <p className="message success-message">{message}</p>}
      {error && <p className="message error-message">{error}</p>}
    </div>
  );
}
