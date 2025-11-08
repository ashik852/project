import React, { useEffect, useState, useMemo } from "react";
import { fetchAllBookings, deleteBookingById } from "../adminServices/adminApi";
import "./AllBookingsTable.css";

function AllBookingsTable({ token }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!token) return;

    async function loadBookings() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAllBookings(token);
        setBookings(data || []);
      } catch (err) {
        setError("There was a problem loading the booking.");
        console.error(err);
      }
      setLoading(false);
    }

    loadBookings();
  }, [token]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return bookings;
    return bookings.filter(
      (b) =>
        (b.phoneNumber || "").toLowerCase().includes(q) ||
        (b.user?.email || "").toLowerCase().includes(q)
    );
  }, [search, bookings]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Do you want to delete this booking?");
    if (!confirmed) return;

    try {
      await deleteBookingById(id, token);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("The booking could not be deleted. Please try again.");
    }
  };

  if (loading) return <p className="loadingText">Loading bookings...</p>;
  if (error) return <p className="errorText">{error}</p>;

  return (
    <div className="container">
      <h2 className="title">All Bookings</h2>

      <input
        type="text"
        placeholder="Search by phone number or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      <div className="tableContainer">
        <table className="table" cellSpacing="0" cellPadding="0">
          <thead className="thead">
            <tr>
              <th>Tour Name</th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Pickup Location</th>
              <th>Total People</th>
              <th>Booking Date</th>
              <th>Total Price</th>
              <th className="centerText">Action</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="noDataText">
                  No Booking Found
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b._id}>
                  <td>{b.tour?.name || "N/A"}</td>
                  <td>{b.user?.name || "N/A"}</td>
                  <td>{b.phoneNumber || "N/A"}</td>
                  <td>{b.user?.email || "N/A"}</td>
                  <td>{b.pickupLocation || "N/A"}</td>
                  <td className="centerText">{b.people || "N/A"}</td>
                  <td>
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>${b.totalCost || "N/A"}</td>
                  <td className="centerText">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="deleteBtn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBookingsTable;
