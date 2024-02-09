import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ispcss.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Isphome from "../Isphome";
import Ispnavbar from "../Ispnavbar";

function AddIspnodes() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const [ispnodes, setIspnodes] = useState({
    nodename: "",
    failuretime: "",
    restorationtime: "",
    outagereason: "",
    currentstatus: "",
    openedby: "",
    closedby: "",
    createdbyuserid: "",
    // closedbyuserid: "",
  });

  useEffect(() => {
    // Fetch user data based on user ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/65a55eee541e22caa735f6d7`
        );
        // console.log(    response.data)
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIspnodes((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nodedata = {
      nodename: ispnodes.nodename,
      failuretime: selectedDate,
      restorationtime: "",
      outagereason: ispnodes.outagereason,
      currentstatus: ispnodes.currentstatus,
      openedby: user.name,
      closedby: "",
      createdbyuserid: user._id,
      closedbyuserid: "",
    };
    console.log(nodedata);

    try {
      // Send a POST request to your backend API to create a new entry
      const response = await axios.post(
        "http://localhost:4000/ispdetails",
        nodedata
      );
      console.log("response");
      console.log(response);
      const ispreportdata = {
        openispnodeid: response.data._id,
        nodename: ispnodes.nodename,
        failuretime: selectedDate,
        restorationtime: "",
        outagereason: ispnodes.outagereason,
        currentstatus: ispnodes.currentstatus,
        openedby: user.name,
        closedby: "",
        solution: "ME still down",
      };

      console.log("ispreportdata");
      console.log(ispreportdata);

      await axios.post("http://localhost:4000/dailyispreport", ispreportdata);
      await axios.post("http://localhost:4000/monthlyispreport", ispreportdata);

      navigate("/ispnodes/openispnodes");
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  return (
    <div>
      {/* <Isphome /> */}
      {/* <div className="ispcontaier"> */}
      {/* <Ispnavbar /> */}
      <div className="ispcontaier">
        {/* <Isphome /> */}
        <h1 className="isp-header">Add Isp Node</h1>

        <form onSubmit={handleSubmit}>
          <div className="openticketsection">
            <div className="addnodeinputdiv">
              <label className="openticket-label">Node Name:</label>
              <input
                type="text"
                name="nodename"
                className="openticket-input"
                value={ispnodes.nodename}
                onChange={handleInputChange}
              />
            </div>

            <div className="addnodeinputdiv">
              <label className="openticket-label">Failure Time:</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy   HH:mm 'hrs'"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                className="openticket-input"
              />
            </div>
          </div>

          <div className="addnodeinputdiv">
            <div>
              <label> Outage Reason:</label>
            </div>
            <textarea
              name="outagereason"
              value={ispnodes.outagereason}
              onChange={handleInputChange}
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

          <div className="addnodeinputdiv">
            <div>
              <label> Current Status:</label>
            </div>
            <textarea
              name="currentstatus"
              placeholder="What is being done about the situation"
              value={ispnodes.currentstatus}
              onChange={handleInputChange}
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
          {/* <div className="problem-description">
            <div>
              <label> Current Status:</label>
            </div>
            <textarea
              name="currentstatus"
              value={ispnodes.currentstatus}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "80px",
                resize: "none",
                // border: " none",
                margin: "10px 0",
              }}
            />
          </div> */}
          <button type="submit" className="newticket-submitbtn">
            Add Node
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddIspnodes;
