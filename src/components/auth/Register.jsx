import React, { useState } from "react";
import "./auth.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    officenumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if any field is empty
      for (const key in formData) {
        if (formData[key] === "") {
          setErrorMessage("All fields are required.");
          return;
        }
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      const { confirmPassword, ...formDataToSend } = formData;

      const response = await axios.post(
        `http://localhost:4000/users/register`,

        formDataToSend
      );

      navigate("/auth/login", { replace: true });

      // Clear error message if validation passes

      // Form submission logic
      console.log(formData);
      // You can proceed with form submission here
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

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
        <div className="auth-form-group">
          <div>
            <label htmlFor="name" className="forminput-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="forminput-input"
            />
          </div>
          <div>
            <label htmlFor="username" className="forminput-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="forminput-input"
            />
          </div>
        </div>

        <div className="auth-form-group">
          <div>
            <label htmlFor="email" className="forminput-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="forminput-input"
            />
          </div>
          <div>
            <label htmlFor="phonenumber" className="forminput-label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="forminput-input"
            />
          </div>
        </div>
        <div className="auth-form-group">
          <div>
            <label htmlFor="password" className="forminput-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="forminput-input"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="forminput-label">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="forminput-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="officenumber" className="forminput-label">
            Office Number:
          </label>
          <input
            type="text"
            id="officenumber"
            name="officenumber"
            value={formData.officenumber}
            onChange={handleChange}
            className="forminput-input"
          />
        </div>
        <button type="submit" className="authbtn">
          Register
        </button>

        <div className="registerdiv">
          <p>Already have an account?</p>
          <a href="/auth/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
