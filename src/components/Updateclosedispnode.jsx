import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import "./Addispnodes.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";

function Updateclosedispnode() {
  const { nodeId } = useParams();

  //   console.log(nodeId);

  const [timeoferror, setTimeoferror] = useState(new Date());

  const [restorationtime, setRestorationtime] = useState(new Date());
  const navigate = useNavigate();

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
          `http://localhost:4000/closeispnode/${nodeId}`
        );
        console.log("response.data");
        console.log(response.data);
        setIspNode(response.data);

        setRestorationtime(new Date(response.data.restorationtime));
        setTimeoferror(new Date(response.data.failuretime));
      } catch (error) {
        console.error("Error fetching ISP node data:", error);
      }
    };

    fetchUserData();
    fetchIspNodeData();
  }, [nodeId]);

  //   const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };

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
      failuretime: timeoferror,
      restorationtime: restorationtime,
      solution: ispnode.solution,
    };

    console.log(updatedNodeData);

    const { _id, ...formDataWithoutId } = updatedNodeData;
    const monthlyreportData = {
      ...formDataWithoutId,
    };

    try {
      // // Send a PUT request to update the ISP node
      const response = await axios.put(
        `http://localhost:4000/closeispnode/${nodeId}`,
        updatedNodeData
      );
      console.log("Node updated:", response.data);
      await axios.put(
        `http://localhost:4000/monthlyispreport/${ispnode.openispnodeid}`,
        monthlyreportData
      );
      // navigate("/ispnodes/closedispnodes");
    } catch (error) {
      console.error("Error updating node:", error);
    }
  };

  return (
    <div>
      <div className="ispcontaier">
        <h1 className="addnodeheader">Update Closed Isp Node</h1>

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

          <div className="addnodeinputdiv">
            <div>
              <label>Failure Time:</label>
            </div>
            <DatePicker
              selected={timeoferror}
              onChange={(date) => {
                setTimeoferror(date);
              }}
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
              <label>Restoration Time:</label>
            </div>
            <DatePicker
              selected={restorationtime}
              onChange={(date) => {
                setRestorationtime(date);
              }}
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
                resize: "none",
                outline: "none",
                // border: " none",
                margin: "10px 0",
              }}
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
          <button type="submit" className="newticket-submitbtn">
            Update Node
          </button>
        </form>
      </div>
    </div>
  );
}

export default Updateclosedispnode;
