import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewForm.css";

export default function ReviewForm({ tourId, onReviewAdded }) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/tours/${tourId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            rating: Number(rating),
            review,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      if (data.status === "success") {
        // Clear form
        setName("");
        setRating(0);
        setReview("");

        // Show success message
        setSuccessMsg("✅ Review submitted successfully!");

        // Hide message after 1 second
        setTimeout(() => setSuccessMsg(""), 1000);

        // Trigger parent to refresh reviews
        if (onReviewAdded) onReviewAdded();
      }
    } catch (err) {
      console.error("❌ Review submission failed:", err.message);
      setError(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3 className="form-title">Give us a review</h3>

      <input
        className="review-input"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={28}
            className={`star ${star <= (hover || rating) ? "active" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>

      <textarea
        className="review-textarea"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className={`submit-btn ${loading ? "loading" : ""}`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <p className="error-text">❌ Plz login or Signup</p>}
      {successMsg && <p className="success-text">{successMsg}</p>}
    </form>
  );
}
