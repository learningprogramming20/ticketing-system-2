import React, { useState } from "react";
import "./auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectComponentUrl = location.state
    ? location.state.from.pathname
    : "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:4000/users/login`, {
        username,
        password,
      });
      console.log(response.data);
      // Perform your authentication logic and obtain the token
      const receivedToken = response.data.accessToken;
      const userid = response.data.userid;

      // Save the token to AuthContext
      login(receivedToken, userid);
      navigate(redirectComponentUrl, { replace: true });

      //   // Store the token in localStorage
      //   //   localStorage.setItem("token", accessToken);
      //   const userData = {
      //     /* user data from the backend */
      //   };

      //   // Call the login function to set the user in the context
      //   login(response.data);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <form>
        <h1>Login</h1>

        {errorMessage && (
          <p
            style={{
              backgroundColor: "#ffe6e6",
              color: "#ff0000",
              fontSize: "14px",
              padding: "15px",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
            {errorMessage}
          </p>
        )}
        <label className="forminput-label">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="forminput-input auth-forminput-input"
        />

        <label className="forminput-label">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="forminput-input auth-forminput-input"
        />

        <button type="button" className="authbtn" onClick={handleLogin}>
          Login
        </button>
        <div className="registerdiv">
          <p>Dont have an account?</p>
          <a href="/auth/register">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
