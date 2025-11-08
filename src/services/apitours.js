import axios from "axios";

// get all tour plan
// const API_URL = "http://127.0.0.1:3000/api/v1/tours";
const API_URL = "http://127.0.0.1:3000/api/v1/tours";
export async function fetchTours() {
  try {
    const response = await axios.get(API_URL);

    // console.log(response.data);
    const a = response.data.data.data;

    return a;
  } catch (error) {
    console.error("Error fetching:", error.message);
  }
}

// for log-in fetch
//  const res = await fetch("http://127.0.0.1:3000/api/v1/users/login"
export async function loginFetch({ email, password }) {
  const res = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }
  return { token: data.token, user: data.data.user };
}
// signup
export async function signupUser({ name, email, password, passwordConfirm }) {
  const res = await fetch("http://127.0.0.1:3000/api/v1/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, passwordConfirm }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "কিছু একটা ভুল হয়েছে!");

  return data;
}
// forgotPassword api fetch

export const forgotPasswordFetch = async (email) => {
  try {
    console.log("Sending email:", email);

    const res = await fetch(
      "http://127.0.0.1:3000/api/v1/users/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Server Error" };
    }

    return {
      success: true,
      message: data.message || "Reset link sent successfully",
    };
  } catch (err) {
    console.error("Fetch Error:", err);
    return { success: false, message: "Network error or server unavailable." };
  }
};

// for review
// src/api/reviewApi.js
// export async function fetchReviewsByTour(tourId) {
//   const url = `http://127.0.0.1:3000/api/v1/tours/${tourId}/reviews`;
//   const res = await fetch(url);

//   if (!res.ok) {
//     const data = await res.json();
//     console.log(data);
//     throw new Error(data.message || "Failed to fetch reviews");
//   }

//   const data = await res.json();
//   return data.data?.data || [];
// }
// reviewApi.js or apitours.js
export async function createReview(tourId, reviewData) {
  const token = localStorage.getItem("jwt");
  console.log(token);

  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/tours/${tourId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    }
  );
  console.log("Response status:", res.status);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to post review");
  }

  const data = await res.json();
  return data;
}
export async function fetchReviewsByTour(tourId) {
  const res = await fetch(
    `http://127.0.0.1:3000/api/v1/tours/${tourId}/reviews`
  );
  console.log(res);

  if (!res.ok) throw new Error("Failed to fetch reviews");

  const data = await res.json();
  return data.data;
}
// all review

const API_URL_REVIEW = "http://127.0.0.1:3000/api/v1/reviews";

export async function fetch_review() {
  try {
    const token = localStorage.getItem("jwt"); // ✅ তোমার login এ যেটা save করেছো

    const response = await axios.get(API_URL_REVIEW, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ টোকেন পাঠানো
      },
    });

    const a = response.data.data.data;
    return a;
  } catch (error) {
    console.error("Error fetching:", error.message);
  }
}

// user booking api
//
//
//
// Booking details
// const token = localStorage.getItem("token"); // অথবা অন্য কোথাও থেকে টোকেন

// fetch("http://127.0.0.1:3000/api/v1/bookings/tour/64a1f2e0a...", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`, // স্পেস ও সঠিক ফরম্যাট চেক করো
//   },
//   body: JSON.stringify({
//     people: 3,
//     address: "House 23, Road 5, Mirpur, Dhaka",
//     pickupLocation: "Mirpur",
//     date: "2025-07-25",
//     paid: true,
//     paymentId: "pi_1KLMNOPQRSTU",
//   }),
// });
