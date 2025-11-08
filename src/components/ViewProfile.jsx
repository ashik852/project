import React, { useState } from "react";
import UpdatePasswordForm from "./UpdatePasword";
import UserProfile from "./UserBooking";
import "./viewProfile.css";

function ViewProfile() {
  const [activeComponent, setActiveComponent] = useState(null); // 'password' or 'profile' or null

  return (
    <div className="view-profile-container">
      <div>
        <div className="button-group">
          <button
            className={`btn ${activeComponent === "password" ? "active" : ""}`}
            onClick={() => setActiveComponent("password")}
          >
            Update Password
          </button>

          <button
            className={`btn ${activeComponent === "profile" ? "active" : ""}`}
            onClick={() => setActiveComponent("profile")}
          >
            My Bookings
          </button>
        </div>
      </div>
      <div className="component-display">
        {activeComponent === "password" && <UpdatePasswordForm />}
        {activeComponent === "profile" && <UserProfile />}
      </div>
    </div>
  );
}

export default ViewProfile;
