import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edituser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    phonenumber: "",
    officenumber: "",
    roles: [], // Set roles as an array
  });

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/${userId}`
        );
        setUser(response.data);
        // const { _id, ...ticketWithoutId } = response.data.ticket;
        // setTicket(ticketWithoutId);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchTicket();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRoles = (event) => {
    const { name, value } = event.target;

    // If the selected value is an array (multiple), convert it to an array
    const selectedRoles = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setUser((prevUser) => ({
      ...prevUser,
      [name]: selectedRoles,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      await axios.put(`http://localhost:4000/users/${userId}`, user);
      navigate("/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <div className="ispcontaier">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="loginfields">
          <div>
            <label className="openticket-label">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="openticket-input"
              //   required
            />
          </div>
          <div>
            <label className="openticket-label">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="openticket-input"
              //   required
            />
          </div>
          <div>
            <label className="openticket-label">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="openticket-input"
              //   required
            />
          </div>
        </div>
        <div className="loginfields">
          <div>
            <label className="openticket-label">Phone Number:</label>
            <input
              type="text"
              name="phonenumber"
              value={user.phonenumber}
              onChange={handleChange}
              className="openticket-input"
            />
          </div>
        </div>
        <div className="loginfields">
          <div>
            <label className="openticket-label">Office Number:</label>
            <input
              type="text"
              name="officenumber"
              value={user.officenumber}
              onChange={handleChange}
              className="openticket-input"
            />
          </div>
          <div>
            <label className="openticket-label">Role:</label>
            <select
              name="roles"
              value={user.roles}
              onChange={handleRoles}
              className="openticket-input"
              multiple
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button type="submit" className="newticket-submitbtn">
          Add User
        </button>
      </form>
    </div>
  );
}

export default Edituser;
