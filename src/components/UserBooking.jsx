import React, { useEffect, useState } from "react";
import "./userBooking.css";

function UserProfile() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:3000/api/v1/bookings/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setBookings(data.data.bookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return <div className="user-profile__loading">Loading bookings...</div>;
  if (error) return <div className="user-profile__error">Error: {error}</div>;

  return (
    <div className="user-profile__container">
      <h1 className="user-profile__title">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="user-profile__empty-message">
          You haven't booked any tours yet.
        </p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="user-profile__booking-card">
            <h2 className="user-profile__booking-tour-name">
              {booking.tour?.name || "Tour name not found"}
            </h2>
            <p className="user-profile__booking-detail">
              <strong>Date:</strong>{" "}
              {new Date(booking.date).toLocaleDateString()}
            </p>
            <p className="user-profile__booking-detail">
              <strong>People:</strong> {booking.people}
            </p>
            <p className="user-profile__booking-detail">
              <strong>Pickup:</strong> {booking.pickupLocation}
            </p>
            <p className="user-profile__booking-detail">
              <strong>Phone:</strong> {booking.phoneNumber}
            </p>
            <p className="user-profile__booking-detail">
              <strong>Total Cost:</strong> {booking.totalCost} BDT
            </p>
            <p className="user-profile__booking-detail">
              <strong>Paid:</strong> {booking.paid ? "✅ Yes" : "❌ No"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfile;
