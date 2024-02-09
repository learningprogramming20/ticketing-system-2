import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import "./Addispnodes.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Updateispnode() {
  const { nodeId } = useParams();

  const openispnodeid = nodeId;

  //   console.log(nodeId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const [ispnode, setIspNode] = useState({
    nodename: "",
    failuretime: "",
    restorationtime: "",
    outagereason: "",
    currentstatus: "",
    openedby: "",
    closedby: "",
    createdbyuserid: "",
  });

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
        // console.log(response.data);
        setIspNode(response.data);

        setSelectedDate(new Date(response.data.failuretime));
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

    const updatedNodeData = {
      ...ispnode,
      failuretime: selectedDate,
      outagereason: ispnode.outagereason,
      currentstatus: ispnode.currentstatus,
    };

    console.log(updatedNodeData);

    const ispreportdata = {
      failuretime: selectedDate,
      outagereason: ispnode.outagereason,
      currentstatus: ispnode.currentstatus,
    };

    try {
      // Send a PUT request to update the ISP node
      const response = await axios.put(
        `http://localhost:4000/ispdetails/${nodeId}`,
        updatedNodeData
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

      navigate("/ispnodes/openispnodes");
    } catch (error) {
      console.error("Error updating node:", error);
    }
  };

  return (
    <div>
      <div className="ispcontaier">
        <h1 className="addnodeheader">Update Isp Node</h1>

        <form onSubmit={handleSubmit}>
          <div className="addnodeinputdiv">
            <div>
              <label>Node Name:</label>
            </div>
            <input
              type="text"
              name="nodename"
              value={ispnode.nodename}
              onChange={handleInputChange}
              className="openticket-input"
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
              <label> Outage Reason:</label>
            </div>
            <textarea
              name="outagereason"
              value={ispnode.outagereason}
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

          <div className="addnodeinputdiv">
            <div>
              <label> Current Status:</label>
            </div>
            <textarea
              name="currentstatus"
              placeholder="What is being done about the situation"
              value={ispnode.currentstatus}
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
            Add Node
          </button>
        </form>
      </div>
    </div>
  );
}

export default Updateispnode;
