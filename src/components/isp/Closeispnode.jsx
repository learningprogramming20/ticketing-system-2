import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Addispnodes.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";

function Closeispnode() {
  const { nodeId } = useParams();
  const openispnodeid = nodeId;

  //   console.log(nodeId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errorDate, setErrorDate] = useState(new Date());
  const [user, setUser] = useState("");
  const [ispnode, setIspNode] = useState({
    nodename: "",
    failuretime: "",
    restorationtime: "",
    outagereason: "",
    currentstatus: "",
    openedby: "",
    closedby: "",
    closedbyuserid: "",
  });
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

    const fetchIspNodeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/ispdetails/${nodeId}`
        );
        console.log("response.data");
        console.log(response.data);
        setIspNode(response.data);

        setErrorDate(new Date(response.data.failuretime));
      } catch (error) {
        console.error("Error fetching ISP node data:", error);
      }
    };

    fetchUserData();
    fetchIspNodeData();
  }, [nodeId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIspNode((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nodedata = {
      nodename: ispnode.nodename,
      failuretime: ispnode.failuretime,
      restorationtime: selectedDate,
      outagereason: ispnode.outagereason,
      currentstatus: "ME now up",
      solution: ispnode.solution,
      openedby: ispnode.openedby,
      closedby: user.name,
      closedbyuserid: user._id,
      openispnodeid: openispnodeid,
    };

    console.log(nodedata);

    const ispreportdata = {
      restorationtime: selectedDate,
      currentstatus: "ME now up",
      solution: ispnode.solution,
      closedby: user.name,
    };
    try {
      const response = await axios.post(
        `http://localhost:4000/closeispnode`,
        nodedata
      );
      console.log("Node updated:", response.data);
      await axios.put(
        `http://localhost:4000/dailyispreport/${openispnodeid}`,
        ispreportdata
      );
      await axios.put(
        `http://localhost:4000/monthlyispreport/${openispnodeid}`,
        ispreportdata
      );
      await axios.delete(`http://localhost:4000/ispdetails/${openispnodeid}`);
      navigate("/ispnodes/closedispnodes");
    } catch (error) {
      console.error("Error updating node:", error);
    }
  };

  return (
    <div>
      <div className="ispcontaier">
        <h1 className="addnodeheader">Add Isp Node</h1>

        <form onSubmit={handleSubmit}>
          <div className="addnodeinputdiv">
            <div>
              <label>Node Name:</label>
            </div>
            <input
              type="text"
              name="nodename"
              className="openticket-input"
              value={ispnode.nodename}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          {/* 
          <div className="date-time-picker-row">
           
            <div className="time-picker-container">
              <label>Time:</label>
              <DatePicker
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        
         */}

          <div className="addnodeinputdiv">
            <div>
              <label>Failure Time:</label>
            </div>
            <DatePicker
              selected={errorDate}
              //   onChange={handleDateChange}
              dateFormat="dd/MM/yyyy   HH:mm 'hrs'"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              timeCaption="Time"
              className="openticket-input"
              readOnly
            />
          </div>
          <div className="addnodeinputdiv">
            <div>
              <label> Outage Reason:</label>
            </div>
            <textarea
              name="outagereason"
              value={ispnode.outagereason}
              onChange={handleInputChange}
              readOnly
              style={{
                width: "100%",
                // height: "100px",
                resize: "none",
                outline: "none",
                // border: " none",
                margin: "10px 0",
              }}
            />
          </div>
          <div className="addnodeinputdiv">
            <div>
              <label>Restoration Time:</label>
            </div>
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

          <div className="addnodeinputdiv">
            <div>
              <label>Solution:</label>
            </div>
            <textarea
              name="solution"
              placeholder="Enter Solution"
              value={ispnode.solution}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "100px",
                resize: "none",
                outline: "none",
                // border: " none",
                margin: "10px 0",
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
            Close Node
          </button>
        </form>
      </div>
    </div>
  );
}

export default Closeispnode;
