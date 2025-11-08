import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";
import { MenuItem } from "./Menuitem";
import Logo from "../assets/favicon.png";
import "./NavBar.css";

function Navbar() {
  const { user, logout } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [clicked, setClicked] = useState(false); // ✅ for menu icon toggle

  useEffect(() => {
    if (user) {
      setShowDropdown(false);
    }
  }, [user]);

  return (
    <nav className="navbar">
      <div className="nav-first">
        <div className="navbar-logo">
          <img src={Logo} className="logo-img" />
          <span className="logo-text">Natours</span>
        </div>

        {/* Toggle menu icon */}
        <div className="menu-icon" onClick={() => setClicked(!clicked)}>
          <i className={clicked ? "fa-solid fa-times" : "fa fa-bars"}></i>
        </div>

        {/*  Conditional menu (toggle show/hide) */}
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItem.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className={item.cName}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* navbar-links */}
      <div className="navbar-links">
        {!user && (
          <div className="navbar-auth-links">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Sign Up
            </Link>
          </div>
        )}

        {/* Normal User Dropdown */}
        {user && user.role !== "admin" && (
          <div className="navbar-user-dropdown">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="dropdown-toggle"
            >
              <span className="user-toggle-content">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </span>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/user/profile" className="dropdown-item">
                  View Profile
                </Link>
                <button onClick={logout} className="dropdown-item logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Admin Panel */}
        {user && user.role === "admin" && (
          <div className="navbar-admin">
            <span className="admin-name">{user.name}</span>
            <Link to="/dashboard" className="admin-link">
              Dashboard
            </Link>
            <Link to="/createAtour" className="admin-link">
              Create Tour
            </Link>
            <Link to="/users" className="admin-link">
              Manage Users
            </Link>

            <button onClick={logout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
