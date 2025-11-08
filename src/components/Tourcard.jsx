import React from "react";
import { Link } from "react-router-dom";
import "./TourCard.css";

export default function TourCard({ id, image, name, price, duration }) {
  return (
    <div className="tour-card">
      <img src={image} alt={name} className="tour-card-img" />

      <div className="tour-card-body">
        <h2 className="tour-card-title">{name}</h2>
        <p className="tour-card-price">Price: ${price}</p>
        <p className="tour-card-duration">Duration: {duration} days</p>

        <Link to={`/tours/${id}`} className="tour-card-link">
          <button className="tour-card-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
}
