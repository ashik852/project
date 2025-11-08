import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/v1/users";

export const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("No JWT found");

    const res = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });

    return res.data.data.data;
  } catch (err) {
    console.error("User fetch error:", err);
    throw err;
  }
};

// Create new Tour API
// api/tourApi.js
// api/tourApi.js
export const createTour = async (formData) => {
  try {
    const token = localStorage.getItem("jwt");

    const res = await fetch("http://127.0.0.1:3000/api/v1/tours", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create tour");

    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
// get all booking details
// bookingAPI.js
export const fetchAllBookings = async (token) => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("❌ Server error:", res.status, res.statusText);
      return;
    }

    const data = await res.json();

    return data.data.bookings;
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    throw error;
  }
};
// adminServices/adminApi.js

export async function deleteBookingById(id, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/bookings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }

    return true;
  } catch (error) {
    console.error("Delete booking error:", error);
    throw error;
  }
}
