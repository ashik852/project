import { useEffect, useState } from "react";
import { useAuth } from "../contex/AuthContext";
import { deleteReview, editReview } from "./ReviewAction";
import "./ReviewList.css";
// import ReviewForm from "./ReviewForm";

export default function ReviewList({ tourId }) {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const { token } = useAuth();

  // Fetch reviews whenever tourId changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/tours/${tourId}/reviews`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.status === "success") setReviews(data.data.data);
        else setReviews([]);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setReviews([]);
      }
    };

    if (tourId) fetchReviews();
  }, [tourId, token]);

  // Show temporary messages
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 1000); // hide after 1 second
  };

  // Delete review
  const handleDelete = (reviewId) => {
    deleteReview(
      reviewId,
      token,
      (deletedId) => {
        setReviews((prev) => prev.filter((r) => r._id !== deletedId));
        showMessage("🗑️ Review deleted successfully");
      },
      (errMsg) => showMessage(`❌ Delete failed: ${errMsg}`)
    );
  };

  // Edit review
  const handleEdit = (review) => {
    editReview(
      review,
      token,
      (updatedReview) => {
        setReviews((prev) =>
          prev.map((r) => (r._id === updatedReview._id ? updatedReview : r))
        );
        showMessage("✅ Review updated successfully");
      },
      (errMsg) => showMessage(`❌ Edit failed: ${errMsg}`)
    );
  };

  return (
    <div className="review-container">
      {/* Success/Error message */}
      {message && <div className="review-message">{message}</div>}

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet for this tour.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="review-item">
            <strong className="review-user">
              {r.user?.name || "Anonymous"}
            </strong>{" "}
            - <span className="review-rating">{r.rating}⭐</span>
            <p className="review-text">{r.review}</p>
            <button
              onClick={() => handleDelete(r._id)}
              className="review-btn delete-btn"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(r)}
              className="review-btn edit-btn"
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}
