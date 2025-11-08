import { useEffect, useState } from "react";
import { fetch_review } from "../services/apitours";
import "./tourReview.css";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function loadReviews() {
      const data = await fetch_review();

      if (!data || data.length === 0) return;

      // ✅ Fisher–Yates shuffle algorithm
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const randomReviews = shuffled.slice(0, 3);

      setReviews(randomReviews);
    }
    loadReviews();
  }, []);

  return (
    <div className="review-container">
      <h2 className="review-title">Random Reviews</h2>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews found.</p>
      ) : (
        <ul className="review-grid">
          {reviews.map((review) => (
            <li key={review._id} className="review-card">
              <img
                src={
                  review.user?.photo
                    ? `http://127.0.0.1:3000/img/users/${review.user.photo}`
                    : "https://via.placeholder.com/50"
                }
                alt={review.user?.name}
                className="review-user-img"
              />
              <div className="review-content">
                <h3 className="review-user-name">{review.user?.name}</h3>
                <p className="review-text">{review.review}</p>
                <span className="review-rating">⭐ {review.rating}</span>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
