import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setMessage("");

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setMessage("Token sent to your email for reset your password!");

      // Auto hide after 5 seconds
      setTimeout(() => setMessage(""), 5000);
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Reset your Password</h2>

      {message && <p className="forgot-password-success">{message}</p>}

      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="forgot-password-input"
        />
        <button
          type="submit"
          className="forgot-password-button"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
