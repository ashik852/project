// OverviewSection.jsx
import React from "react";
import Bar from "./Bar";
import "./overview.css";

function OverviewSection({ tours, users, guides, AllBookingsTable }) {
  return (
    <div>
      <div className="overview-section">
        <h2 className="section-title">Dashboard Overview</h2>

        <p className="overview-text"></p>

        <div className="overview-cards">
          <div className="overview-card">
            <h3>
              Total Tours <span>{tours.length}</span>
            </h3>
          </div>

          <div className="overview-card">
            <h3>
              Users Tours <span>{users.length}</span>
            </h3>
          </div>

          <div className="overview-card">
            <h3>Total Guides {guides.length}</h3>
          </div>

          <div className="overview-card">
            <h3>
              Total Bookings <span>{AllBookingsTable.length}</span>
            </h3>
            <p></p>
          </div>
        </div>

        <div className="overview-footer">
          <p>Keep track of everything in one place </p>
        </div>
      </div>
      <Bar />
    </div>
  );
}

export default OverviewSection;
