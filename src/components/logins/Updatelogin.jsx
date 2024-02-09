import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addlogin.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

function Updatelogin() {
  const [loginData, setLoginData] = useState({
    loginref: "",
    sitename: "",
    technicianname: "",
    logintime: "",
    reasonforaccess: "",
    umemereading: "",
    gensetrunhours: "",
    fuelamountliters: "",
    fuellevelbefore: "",
    fuellevelafter: "",
    logouttime: "",
  });
  const [logintime, setLogintime] = useState("");
  const [logouttime, setLogouttime] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { loginId } = useParams();

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/logindetails/${loginId}`
        );
        // console.log(response.data);
        setLoginData(response.data);

        setLogintime(new Date(response.data.logintime));
        setLogouttime(new Date(response.data.logouttime));
      } catch (error) {
        console.error("Error fetching Login:", error);
      }
    };

    fetchLoginData();
  }, [loginId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...loginData,
        logintime: logintime,
        logouttime: logouttime,
      };

      console.log(data);

      await axios.put(`http://localhost:4000/logindetails/${loginId}`, data);
      await axios.put(`http://localhost:4000/alllogindetails/${loginId}`, data);

      navigate("/logins");
    } catch (error) {
      console.error("Error updating login:", error);
    }
  };

  return (
    <>
      <div className="openticketscontianer">
        <h4 className="loginstitle">Update Login</h4>
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
                // placeholder="Enter Umeme Reading"
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
              rows="4"
              cols="50"
              onChange={handleInputChange}
              value={loginData.reasonforaccess}
            />
          </div>
          <button type="submit" className="table-button">
            Update Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Updatelogin;
