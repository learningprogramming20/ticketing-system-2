import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import "./Isphome.css";
import axios from "axios";

function Monthlyispreport() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ispnodes, setIspnodes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reports, setReports] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/monthlyispreport`
      );
      console.log(response.data);
      // const filterednodes = response.data.filter((ticket) =>
      //   ticket.sitename.toLowerCase().includes(searchQuery.toLowerCase())
      // );

      setIspnodes(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    // Fetch all running tickets initially
    fetchTickets();
    // }, []);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/monthlyispreport/bydate?startDate=${startDate}&endDate=${endDate}`
      );

      console.log(response.data);
      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="ispcontaier">
        <div className="isp-search">
          <div>
            <p>Start Date</p>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy   HH:mm 'hrs'"
              className="ispsearch-input"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              timeCaption="Time"
            />
          </div>

          <div>
            <p>End Date</p>
            <ReactDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy   HH:mm 'hrs'"
              className="ispsearch-input"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              timeCaption="Time"
            />
          </div>

          <button className="ticket-header-btn" onClick={fetchReports}>
            Find Node
          </button>
        </div>

        <div className="all-ispnodes">
          <h2>Monthly Isp Report</h2>
          <table className="isp-table">
            <thead>
              <tr>
                <th>Node Name</th>
                <th>Failure Time</th>
                <th>Restoration Time</th>
                <th>Outage Reason</th>
                <th>Solution</th>
                <th>Current Status</th>
                <th>Opened By</th>
                <th>Closed By</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {/* {ispnodes.map((ispnode) => {
                return (
                  <tr key={ispnode._id}>
                    <td>{ispnode.nodename}</td>
                    <td>{new Date(ispnode.failuretime).toLocaleString()}</td>
                    <td>
                      {new Date(ispnode.restorationtime).toLocaleString()}
                    </td>
                 
               
                    <td>{ispnode.outagereason}</td>
                    <td>{ispnode.solution}</td>
                    <td>{ispnode.currentstatus}</td>
                    <td>{ispnode.openedby}</td>
                    <td>{ispnode.closedby}</td>
                    <td>
                      <Link to={`/updateclosedispnodes/${ispnode._id}`}>
                        <button className="isptablebtn"> Update</button>
                      </Link>
                    </td>
                  </tr>
                );
              })} */}

              {reports.length > 0
                ? reports.map((ispnode) => (
                    <tr key={ispnode._id}>
                      <td>{ispnode.nodename}</td>
                      <td>{new Date(ispnode.failuretime).toLocaleString()}</td>
                      <td>
                        {new Date(ispnode.restorationtime).toLocaleString()}
                      </td>

                      <td>{ispnode.outagereason}</td>
                      <td>{ispnode.solution}</td>
                      <td>{ispnode.currentstatus}</td>
                      <td>{ispnode.openedby}</td>
                      <td>{ispnode.closedby}</td>
                      {/* <td>
                        <Link to={`/updateispnodes/${ispnode._id}`}>
                          <button className="isptablebtn"> Update</button>
                        </Link>
                      </td> */}
                    </tr>
                  ))
                : ispnodes.map((ispnode) => (
                    <tr key={ispnode._id}>
                      <td>{ispnode.nodename}</td>
                      <td>{new Date(ispnode.failuretime).toLocaleString()}</td>
                      <td>
                        {new Date(ispnode.restorationtime).toLocaleString()}
                      </td>

                      <td>{ispnode.outagereason}</td>
                      <td>{ispnode.solution}</td>
                      <td>{ispnode.currentstatus}</td>
                      <td>{ispnode.openedby}</td>
                      <td>{ispnode.closedby}</td>
                      {/* <td>
                        <Link to={`/updateclosedispnodes/${ispnode._id}`}>
                          <button className="isptablebtn"> Update</button>
                        </Link>
                      </td> */}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Monthlyispreport;
