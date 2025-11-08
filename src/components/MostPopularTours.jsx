// src/components/MostPopularTours.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MostPopularTours.css";

export default function MostPopularTours({ currentId }) {
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    async function fetchPopularTours() {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/v1/tours");
        const data = await res.json();

        // without present tour
        const allTours = data.data.data.filter((t) => t._id !== currentId);

        //  ratingsAverage
        const rated = allTours.filter(
          (t) => typeof t.ratingsAverage === "number"
        );

        let popular;
        if (rated.length) {
          // top 3 rated
          popular = rated
            .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
            .slice(0, 3);
        } else {
          // without rating
          const shuffled = [...allTours].sort(() => 0.5 - Math.random());
          popular = shuffled.slice(0, 3);
        }

        setPopularTours(popular);
      } catch (err) {
        console.error("Error fetching popular tours:", err);
      }
    }

    fetchPopularTours();
  }, [currentId]);

  if (!popularTours.length) return null;

  return (
    <div className="popular-section">
      <h2 className="section-title">🌟 Most Popular Tours</h2>

      <div className="popular-grid">
        {popularTours.map((tour) => (
          <div className="popular-card" key={tour._id}>
            <img
              src={`http://127.0.0.1:3000/img/tours/${tour.imageCover}`}
              alt={tour.name}
              className="popular-img"
            />
            <div className="most-popular-tour">
              <h3>
                Tour Name:<span> {tour.name}</span>
              </h3>
              <h5>
                Summary: <span>{tour.summary}</span>
              </h5>

              <h5>
                duration: <span>{tour.duration}</span>
              </h5>
              <h5>
                maxGroupSize: <span>{tour.maxGroupSize}</span>
              </h5>
              <h5>
                {" "}
                difficulty: <span>{tour.difficulty}</span>
              </h5>
              <h5>
                Price: <span>${tour.price}</span>
              </h5>
              <h5>
                Rating:{" "}
                {tour.ratingsAverage
                  ? `⭐ ${tour.ratingsAverage}`
                  : "No rating"}
              </h5>
            </div>

            <Link to={`/tours/${tour._id}`}>
              <button className="btn-details">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
