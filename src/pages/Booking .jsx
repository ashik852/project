import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";
import "./booking.css";

export default function TourBookingForm() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [tourPrice, setTourPrice] = useState(0);
  const [formData, setFormData] = useState({
    people: 1,
    date: "",
    pickupLocation: "",
    phoneNumber: "",
    address: "",
    email: user?.email || "",
    paymentMethod: "Visa",
    cardNumber: "",
    cardExpiry: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState("");

  // আজ থেকে 35 দিন পরে
  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 35));
  const minDateStr = minDate.toISOString().split("T")[0]; // YYYY-MM-DD

  // 👉 Fetch tour price using tour ID
  useEffect(() => {
    async function fetchTourDetails() {
      try {
        const res = await fetch(
          `https://natours-3da0.onrender.com/api/v1/tours/${id}`
        );
        const data = await res.json();
        if (res.ok) setTourPrice(data.data.data.price || 0);
      } catch (err) {
        console.error("Failed to load tour price", err);
      }
    }
    if (id) fetchTourDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Date validation
    if (name === "date") {
      const selectedDate = new Date(value);
      const now = new Date();
      now.setHours(0, 0, 0, 0); // শুধুমাত্র date তুলনা

      if (selectedDate < now) {
        setDateError("You cannot select past dates.");
      } else if (selectedDate < minDate) {
        setDateError(
          "Booking date must be at least 35 days from today,cause of visa procesing."
        );
      } else {
        setDateError("");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalAmount = tourPrice * formData.people;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dateError) return;

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://natours-3da0.onrender.com/api/v1/bookings/tour/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            paid: true,
            paymentId: `card_${formData.paymentMethod}_${Date.now()}`,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      setMessage(
        "✅ Booking successful! We will send a confirmation email to your inbox shortly..with details"
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2 className="booking-form-title">Book A Tour</h2>

      {message && <p className="booking-form-message">{message}</p>}

      <form onSubmit={handleSubmit} className="booking-form">
        <label>Number of People</label>
        <input
          type="number"
          name="people"
          className="booking-input"
          placeholder="Number of People"
          value={formData.people}
          onChange={handleChange}
          min={1}
          required
        />

        <label>Select Date</label>
        <input
          type="date"
          name="date"
          className="booking-input"
          value={formData.date}
          min={minDateStr}
          onChange={handleChange}
          required
        />
        {dateError && <p className="text-red-500">{dateError}</p>}

        <input
          type="text"
          name="pickupLocation"
          className="booking-input"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          className="booking-input"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          className="booking-input"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="booking-input"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="booking-select-group">
          <label htmlFor="paymentMethod" className="booking-label">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            className="booking-select"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="PayPal">PayPal</option>
            <option value="Wise">Wise</option>
          </select>
        </div>

        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          className="booking-input"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          type="month"
          name="cardExpiry"
          placeholder="Expiry"
          className="booking-input"
          value={formData.cardExpiry}
          onChange={handleChange}
          required
        />

        <div className="booking-total-amount">
          Total Amount: ৳ {totalAmount}
        </div>

        <button
          type="submit"
          className="booking-submit-btn"
          disabled={loading || !!dateError}
        >
          {loading ? "Processing..." : "Confirm Booking."}
        </button>
      </form>
    </div>
  );
}
