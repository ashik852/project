// TourBookingsTable.jsx
import React from "react";

function TourBookingsTable({ bookings }) {
  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <table className="table-auto border w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">User Name</th>
          <th className="border px-4 py-2">Phone</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Pickup Location</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id}>
            <td className="border px-4 py-2">{booking.user?.name}</td>
            <td className="border px-4 py-2">{booking.user?.phone}</td>
            <td className="border px-4 py-2">{booking.user?.email}</td>
            <td className="border px-4 py-2">{booking.pickupLocation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TourBookingsTable;
