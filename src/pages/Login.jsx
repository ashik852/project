import "./login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginFetch } from "../services/apitours";
import { useAuth } from "../contex/AuthContext";
import Loader from "../ui/Loader";
import Logo from "../assets/favicon.png";
import "./login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await loginFetch({ email, password });
      login(user, token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="login-container">
      <div className="login-header">
        <img className="login-logo" src={Logo} />
        <h2 className="login-title">Login</h2>
      </div>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>

      <Link to="/forgot-password" className="forgot-link">
        Forgot Password?
      </Link>
    </div>
  );
}
