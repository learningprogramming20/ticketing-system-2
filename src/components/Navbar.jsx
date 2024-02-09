import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "./context/authContext";

function Navbar() {
  const { user, logout } = useAuth();
  // console.log("!user.roles.includes(role)");
  // console.log(!user.roles.includes("admin"));
  // console.log(user);
  // console.log(user.roles);
  // const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">Your Logo</div>
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/tickets">Tickets</Link>
          </li>
          <li>
            <Link to="/ispnodes">Isp Nodes</Link>
          </li>
          <li>
            <Link to="/logins">Logins</Link>
          </li>
          <li>
            <Link to="/sites">Sites</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <h1>{user.roles}</h1>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
