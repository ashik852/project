// reviewActions.js
// export const deleteReview = async (reviewId, token, onSuccess, onError) => {
//   try {
//     const res = await fetch(
//       `http://127.0.0.1:3000/api/v1/reviews/${reviewId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const data = await res.json();
//     if (data.status === "success") {
//       if (onSuccess) onSuccess(reviewId);
//     } else {
//       if (onError) onError(data.message);
//     }
//   } catch (err) {
//     if (onError) onError(err.message);
//   }
// };
export const deleteReview = async (reviewId, token, onSuccess, onError) => {
  try {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      if (onSuccess) onSuccess(reviewId);
    } else {
      let errMsg = "Failed to delete review";
      try {
        const data = await res.json();
        if (data?.message) errMsg = data.message;
      } catch {
        // empty response, ignore
      }
      if (onError) onError(errMsg);
    }
  } catch (networkErr) {
    if (onError) onError(networkErr.message || "Network error");
  }
};

// export const editReview = async (review, token, onSuccess, onError) => {
//   const newReviewText = prompt("Update your review:", review.review);
//   const newRating = prompt("Update rating (1-5):", review.rating);

//   if (!newReviewText || !newRating) return;

//   try {
//     const res = await fetch(
//       `http://127.0.0.1:3000/api/v1/reviews/${review._id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           review: newReviewText,
//           rating: Number(newRating),
//         }),
//       }
//     );

//     const data = await res.json();
//     if (data.status === "success") {
//       if (onSuccess) onSuccess(data.data);
//     } else {
//       if (onError) onError(data.message);
//     }
//   } catch (err) {
//     if (onError) onError(err.message);
//   }
// };

export const editReview = async (review, token, onSuccess, onError) => {
  const newReviewText = prompt("Update your review:", review.review);
  const newRating = prompt("Update rating (1-5):", review.rating);

  if (!newReviewText || !newRating) return;

  try {
    const res = await fetch(
      `http://127.0.0.1:3000/api/v1/reviews/${review._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review: newReviewText,
          rating: Number(newRating),
        }),
      }
    );

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (res.ok) {
      if (onSuccess)
        onSuccess(
          data?.data || {
            ...review,
            review: newReviewText,
            rating: Number(newRating),
          }
        );
    } else {
      if (onError) onError(data?.message || "Failed to update review");
    }
  } catch {
    if (onError) onError("Network error");
  }
};
