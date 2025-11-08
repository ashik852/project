import React, { useEffect, useState } from "react";
import { fetchTours } from "../services/apitours";
import TourCard from "../components/Tourcard";
import "./TourData.css";
import Loader from "../ui/Loader";
import Logo from "../assets/favicon.png";

export default function TourData() {
  const [data, setData] = useState([]);

  const toggleTourStatus = (id) => {
    setData((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id ? { ...tour, isActive: !tour.isActive } : tour
      )
    );
  };

  useEffect(() => {
    async function getData() {
      try {
        const tours = await fetchTours();
        setData(tours);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    }
    getData();
  }, []);

  return (
    <div className="tour-data-container">
      <div className="heder-design">
        <img src={Logo} className="logo-img" />

        <h1 className="tour-title">Available Tours</h1>
      </div>

      <div className="tour-grid">
        {data.length > 0 ? (
          data.map((tour) => (
            <TourCard
              key={tour._id}
              className="tour-card"
              image={`https://natours-3da0.onrender.com/img/tours/${tour.imageCover}`}
              name={tour.name}
              price={tour.price}
              duration={tour.duration}
              id={tour._id}
              isActive={tour.isActive}
              isAdmin={false}
              onToggleStatus={toggleTourStatus}
            />
          ))
        ) : (
          <div className="tour-loader">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
