import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
// import "./Isphome.css";
import axios from "axios";

function Closedispnode() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ispnodes, setIspnodes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/closeispnode`);
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

  const deleteispnode = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/ispdetails/${id}`);
      //  await axios.delete(`http://localhost:2000/hourlyreport/${id}`);

      fetchTickets();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <div className="ispcontaier">
        <div className="isp-search">
          <input
            type="text"
            placeholder="Search Site"
            value={searchQuery}
            onChange={handleSearchChange}
            className="ispsearch-input"
          />

          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="ispsearch-input"
          />
          <button className="ticket-header-btn">Find Node</button>
        </div>

        <div className="all-ispnodes">
          <h2>All closed nodes</h2>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ispnodes.map((ispnode) => (
                <tr key={ispnode._id}>
                  <td>{ispnode.nodename}</td>
                  <td>{new Date(ispnode.failuretime).toLocaleString()}</td>
                  <td>{new Date(ispnode.restorationtime).toLocaleString()}</td>
                  {/* <td>
                    {ispnode.restorationtime
                      ? new Date(ispnode.restorationtime).toLocaleString()
                      : "Not available"}
                  </td> */}
                  <td>{ispnode.outagereason}</td>
                  <td>{ispnode.solution}</td>
                  <td>{ispnode.currentstatus}</td>
                  <td>{ispnode.openedby}</td>
                  <td>{ispnode.closedby}</td>
                  <td>
                    <Link to={`/ispnodes/updateclosedispnodes/${ispnode._id}`}>
                      <button className="table-button"> Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Closedispnode;
