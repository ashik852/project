import "./usercard.css";
import React from "react";
const UserCard = React.memo(function UserCard({ image, name, email, id }) {
  return (
    <div className="user-card">
      <img src={image} className="user-img" alt={name} />
      <p className="user-info">
        <strong>ID:</strong> {id}
      </p>
      <p className="user-info">
        <strong>Name:</strong> {name}
      </p>
      <p className="user-info">
        <strong>Email:</strong> {email}
      </p>
    </div>
  );
});
export default UserCard;
