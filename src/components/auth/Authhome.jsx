import { Link, Outlet } from "react-router-dom";
import "./auth.css";

function Authhome() {
  return (
    <div className="auth-home-container">
      <h2 className="auth-heading">
        Welcome to Uganda Telecom Ticketing System
      </h2>
      <p className="auth-subtitle">
        Please log in or register to access our ticketing services.
      </p>
      <div className="auth-buttons">
        <Link to="/auth/login">
          <button className="auth-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="auth-button">Register</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Authhome;
