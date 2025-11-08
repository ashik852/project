import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";

import MapView from "../components/MapView";
import MostPopularTours from "../components/MostPopularTours";
import Loader from "../ui/Loader";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TourDetails.css";
import { useAuth } from "../contex/AuthContext";

export default function TourDetails() {
  const { id } = useParams(); // Tour id from URL
  const { token } = useAuth();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // for review refresh

  // Fetch tour details
  useEffect(() => {
    let isMounted = true;

    const fetchTour = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/api/v1/tours/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch tour");

        if (isMounted) setTour(data.data?.data);
      } catch (err) {
        console.error("❌ Failed to fetch tour:", err.message);
        if (isMounted) setTour(null);
      } finally {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 500);
      }
    };

    fetchTour();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <Loader />;

  if (!tour)
    return <p className="tour-details__not-found">🚫 Tour not found</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  const handleBookingClick = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(`/booking/tour/${tour._id}`);
  };

  return (
    <div className="tour-details">
      {/* Tour Title */}
      <h1 className="tour-details__title">{tour.name}</h1>

      {/* Image Slider */}
      <Slider {...sliderSettings} className="tour-details__slider image-slider">
        {tour.images.map((img, i) => (
          <div key={i}>
            <img
              src={`http://127.0.0.1:3000/img/tours/${img}`}
              alt={`Slide ${i + 1}`}
              className="tour-details__slider-img slider-img"
            />
          </div>
        ))}
      </Slider>

      {/* Tour Info */}
      <div className="tour-details__info tour-info">
        <h3 className="tour-info__title">{tour.name}</h3>
        <h4 className="tour-info__summary">
          <p>{tour.summary}</p>
        </h4>
        <h4 className="tour-info__detail">
          🕒 Duration: <span> {tour.duration} days</span>
        </h4>

        <h4 className="tour-info__detail">
          👥 Max Group Size:<span> {tour.maxGroupSize}</span>
        </h4>
        <h4 className="tour-info__detail">
          🏔️ Difficulty:<span> {tour.difficulty}</span>
        </h4>
        <h4 className="tour-info__detail">
          📍 Start Location:<span> {tour.startLocation?.address}</span>
        </h4>
        <h4 className="tour-info__detail">
          💵 Price: $<span>{tour.price}</span>
        </h4>
      </div>

      {/* <Guide /> */}

      {/* Map Section */}
      {tour.startLocation && (
        <section
          className="tour-details__map-section"
          style={{ marginTop: 40 }}
        >
          <h3 className="tour-details__map-title">🗺️ Tour Start Location</h3>
          <MapView
            coordinates={tour.startLocation.coordinates}
            locationName={tour.startLocation.description}
          />
        </section>
      )}

      {/* Most Popular Tours */}
      <MostPopularTours currentId={id} />

      <section className="tour-details__reviews" style={{ marginTop: 40 }}>
        <ReviewForm
          tourId={id}
          onReviewAdded={() => setRefresh((prev) => !prev)} // trigger refresh in ReviewList
        />
        <ReviewList tourId={id} refresh={refresh} />
      </section>

      {/* Book Now Button */}
      <div
        className="tour-details__book-btn-container"
        style={{ marginTop: 40, textAlign: "center" }}
      >
        <button
          onClick={handleBookingClick}
          className="tour-details__book-btn book-now-btn"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
