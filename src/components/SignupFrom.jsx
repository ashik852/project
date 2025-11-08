import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/apitours";
import "./SignupForm.css"; // External CSS import

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    if (formData.password !== formData.confirmPassword) {
      setStatus({
        loading: false,
        error: "Don't match your password",
        success: "",
      });
      return;
    }

    try {
      await signupUser({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
      });

      setStatus({ loading: false, error: "", success: "Sign-up successful!" });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: "" });
    }
  }

  return (
    <div className="signup-form">
      <h2 className="signup-title">Create an account</h2>

      <form onSubmit={handleSubmit} className="signup-form-fields">
        <label className="input-label">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <label className="input-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="signup-input"
        />
        <label className="input-label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={8}
          className="signup-input"
        />
        <label className="input-label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="signup-input"
        />

        <button
          type="submit"
          disabled={status.loading}
          className="signup-button"
        >
          {status.loading ? "Signing up..." : "Sign up"}
        </button>
      </form>

      {status.success && (
        <p className="success-message">
          {status.success} Redirecting to login...
        </p>
      )}
      {status.error && <p className="error-message">{status.error}</p>}
    </div>
  );
}
