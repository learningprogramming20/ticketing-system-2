import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addlogin.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function Addlogin() {
  const [user, setUser] = useState("");
  const [loginData, setLoginData] = useState({
    loginref: "",
    sitename: "",
    technicianname: "",
    logintime: "",
    reasonforaccess: "",
    umemereading: 0,
    gensetrunhours: 0,
    fuelamountliters: 0,
    fuellevelbefore: 0,
    fuellevelafter: 0,
    logouttime: "",
    enteredby: "",
  });
  const [logintime, setLogintime] = useState(new Date());
  const [logouttime, setLogouttime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/65a55eee541e22caa735f6d7`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...loginData,
        loginref: new Date(),
        logintime: logintime,
        logouttime: logouttime,
        enteredby: user.name,
      };

      console.log(data);

      const response = await axios.post(
        "http://localhost:4000/logindetails",
        data
      );
      const alllogindata = {
        loginid: response.data._id,
        loginnumber: response.data.loginnumber,
        enteredby: user.name,
        ...loginData,
      };

      console.log("alllogindata");
      console.log(alllogindata);

      await axios.post("http://localhost:4000/alllogindetails", alllogindata);
      navigate("/logins");
    } catch (error) {
      console.error("Error adding login:", error);
    }
  };

  return (
    <>
      <div className="openticketscontianer">
        <h4 className="loginstitle">New Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="loginfields">
            <div>
              <label htmlFor="sitename" className="login-label">
                Site Name
              </label>
              <input
                className="logins-input"
                type="text"
                id="sitename"
                name="sitename"
                placeholder="Enter Site Name"
                onChange={handleInputChange}
                value={loginData.sitename}
              />
            </div>
            <div>
              <label htmlFor="technicianname" className="login-label">
                Name of Technician
              </label>
              <input
                className="logins-input"
                type="text"
                id="technicianname"
                name="technicianname"
                onChange={handleInputChange}
                placeholder="Enter Name of Technician"
                value={loginData.technicianname}
              />
            </div>
            <div>
              <label htmlFor="umemereading" className="login-label">
                Umeme Reading
              </label>
              <input
                className="logins-input"
                type="text"
                id="umemereading"
                name="umemereading"
                onChange={handleInputChange}
                placeholder="Enter Umeme Reading"
                value={loginData.umemereading}
              />
            </div>
          </div>

          <div className="loginfields">
            <div>
              <label htmlFor="fuelamountliters" className="login-label">
                Fuel Amount Litres
              </label>
              <input
                type="text"
                className="logins-input"
                id="fuelamountliters"
                name="fuelamountliters"
                onChange={handleInputChange}
                placeholder="Enter Fuel Amount Litres"
                value={loginData.fuelamountliters}
              />
            </div>
            <div>
              <label htmlFor="fuellevelbefore" className="login-label">
                Fuel Level Before
              </label>
              <input
                type="text"
                className="logins-input"
                id="fuellevelbefore"
                name="fuellevelbefore"
                onChange={handleInputChange}
                placeholder="Enter Fuel Level Before"
                value={loginData.fuellevelbefore}
              />
            </div>
            <div>
              <label htmlFor="fuellevelafter" className="login-label">
                Fuel Level After
              </label>
              <input
                type="text"
                className="logins-input"
                id="fuellevelafter"
                name="fuellevelafter"
                onChange={handleInputChange}
                placeholder="Enter Fuel Level Before"
                value={loginData.fuellevelafter}
              />
            </div>
          </div>

          <div className="loginfields">
            <div>
              <label htmlFor="gensetrunhours" className="login-label">
                Genset Run Hours
              </label>
              <input
                className="logins-input"
                type="text"
                id="gensetrunhours"
                name="gensetrunhours"
                onChange={handleInputChange}
                placeholder="Enter Genset Run Hours"
                value={loginData.gensetrunhours}
              />
            </div>
            <div>
              <label htmlFor="logintime" className="login-label">
                Login Time
              </label>
              <DatePicker
                selected={logintime}
                onChange={(date) => setLogintime(date)}
                type="text"
                className="logins-input"
                id="logintime"
                name="logintime"
                dateFormat="dd/MM/yyyy   HH:mm 'hrs'"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
              />
            </div>
            <div>
              <label htmlFor="logouttime" className="login-label">
                Logout Time
              </label>
              <DatePicker
                selected={logouttime}
                onChange={(date) => setLogouttime(date)}
                type="text"
                className="logins-input"
                id="logouttime"
                name="logouttime"
                dateFormat="dd/MM/yyyy   HH:mm 'hrs'"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
              />
            </div>
          </div>

          <div>
            <label htmlFor="reasonforaccess" className="login-label">
              Reason of Access
            </label>
            <textarea
              className="logintextarea"
              placeholder="Enter Reason of Access"
              id="reasonforaccess"
              name="reasonforaccess"
              onChange={handleInputChange}
              value={loginData.reasonforaccess}
              style={{
                width: "100%",
                height: "100px",
                resize: "none",
                margin: "10px 0",
                outline: "none",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
          </div>
          <button type="submit" className="newticket-submitbtn">
            Add Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Addlogin;
