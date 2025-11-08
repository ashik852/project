import { useEffect, useState } from "react";
import { fetchAllUsers } from "../adminServices/adminApi";
import UserCard from "../adminComponnet/UserCard";
import "./userdata.css";

export default function UserData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function userData() {
      try {
        const users = await fetchAllUsers();

        setUsers(users);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    userData();
  }, []);

  return (
    <div className="user-data-container">
      <h1 className="user-data-title"> User Data</h1>

      <div className="user-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard
              key={user._id}
              id={user._id}
              // image={`http://127.0.0.1:3000/img/users/${user.photo}`}
              image={
                user.photo
                  ? `http://127.0.0.1:3000/img/users/${user.photo}`
                  : "/default-user.png" // default image
              }
              name={user.name}
              email={user.email}
            />
          ))
        ) : (
          <p className="user-empty-message">No user found</p>
        )}
      </div>
    </div>
  );
}
