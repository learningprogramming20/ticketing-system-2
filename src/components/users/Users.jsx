import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  //   const history = useHistory();

  useEffect(() => {
    // Fetch all users on component mount
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = async (userId) => {
    // try {
    //   await axios.delete(`http://localhost:5000/api/users/${userId}`);
    //   // Update the users list after deletion
    //   fetchUsers();
    // } catch (error) {
    //   console.error("Error deleting user", error);
    // }
  };

  const handleEdit = (user) => {
    // // Check user role before allowing access to edit
    // if (user.role === "admin") {
    //   setSelectedUser(user);
    // } else {
    //   console.error("Permission denied. Only admin users can edit.");
    // }
  };

  //   const redirectToRegister = () => {
  //     history.push("/register");
  //   };
  console.log("user");
  console.log(user);

  return (
    <div>
      <h2>Users</h2>
      <Link to="/adduser">
        <button className="ticket-header-btn">Add User</button>
      </Link>
      <div>
        <h2>User List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Roles</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.roles.join(", ")}</td>
                <td>
                  <Link to={`/edituser/${user._id}`}>
                    <button className="table-button">Edit</button>
                  </Link>
                  {/* <button onClick={() => setEditingUserId(user._id)}>
                    Edit Roles
                  </button> */}
                  <button
                    className="table-button"
                    onClick={() => {
                      handleDelete(user._id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
