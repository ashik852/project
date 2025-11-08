import React, { useState, useEffect } from "react";
import AllBookingsTable from "./Booking";
import { useAuth } from "../../contex/AuthContext";
import Loader from "../AdminUi/AdminLoader";
import { fetchTours } from "../../services/apitours";
import { fetchAllUsers } from "../adminServices/adminApi";
import OverviewSection from "./OverviewSection";

import "./dashboard.css";

function Dashboard() {
  const { token } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [guides, setGuides] = useState([]);
  const [tours, setTours] = useState([]);

  // data load
  useEffect(() => {
    async function userData() {
      try {
        const allUsers = await fetchAllUsers();
        const allTours = await fetchTours();

        const guidesOnly = allUsers.filter(
          (user) => user.role === "guide" || user.role === "lead-guide"
        );

        setGuides(guidesOnly);
        setUsers(allUsers);
        setTours(allTours);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    userData();
  }, []);

  // button click handler

  const handleSectionClick = (section) => {
    setLoading(true);
    setActiveSection(section);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <button
          onClick={() => handleSectionClick("overview")}
          className={`dashboard-stat-button ${
            activeSection === "overview" ? "active" : ""
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => handleSectionClick("tours")}
          className="dashboard-stat-button"
        >
          Total Tours: {tours.length}
        </button>

        <button
          onClick={() => handleSectionClick("users")}
          className="dashboard-stat-button"
        >
          Total Users: {users.length}
        </button>

        <button
          onClick={() => handleSectionClick("guides")}
          className="dashboard-stat-button"
        >
          Total Guides: {guides.length}
        </button>

        <button
          onClick={() => handleSectionClick("bookings")}
          className="dashboard-stat-button"
        >
          {activeSection === "bookings" ? "Hide Bookings" : "Show All Bookings"}
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {loading && <Loader />}

        {/* Tours Section */}
        {!loading && activeSection === "tours" && (
          <div className="bookings-container">
            <h2 className="section-title">All Tours</h2>
            {tours.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#id</th>
                    <th>Tour Name</th>
                    <th>Price</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour, index) => (
                    <tr key={tour._id || index}>
                      <td>{index + 1}</td>
                      <td>{tour.name}</td>
                      <td>${tour.price}</td>
                      <td>{tour.duration} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tours available</p>
            )}
          </div>
        )}
        {!loading && activeSection === "overview" && (
          <OverviewSection
            tours={tours}
            users={users}
            guides={guides}
            AllBookingsTable={AllBookingsTable}
          />
        )}

        {/* Users Section */}
        {!loading && activeSection === "users" && (
          <div className="bookings-container">
            <h2 className="section-title">All Users</h2>
            {users.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id || index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users found</p>
            )}
          </div>
        )}

        {/* Guides Section */}
        {!loading && activeSection === "guides" && (
          <div className="bookings-container">
            <h2 className="section-title">All Guides</h2>
            {guides.length > 0 ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide, index) => (
                    <tr key={guide._id || index}>
                      <td>{index + 1}</td>
                      <td>{guide.name}</td>
                      <td>{guide.email}</td>
                      <td>{guide.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No guides available</p>
            )}
          </div>
        )}

        {/* Bookings Section */}
        {!loading && activeSection === "bookings" && (
          <div className="bookings-container">
            <h2 className="section-title">All Bookings</h2>
            <AllBookingsTable token={token} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
