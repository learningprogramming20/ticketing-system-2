import React, { useEffect, useState } from "react";
import "./Opentickets.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";

function Closedtickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch all running tickets initially
    fetchTickets();
    // }, []);
  }, [searchQuery]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/closedtickets");
      console.log(response.data.tickets);
      const filteredTickets = response.data.tickets.filter((ticket) =>
        ticket.sitename.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setTickets(filteredTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/opentickets/${id}`);
      await axios.delete(`http://localhost:4000/dailyreport/${id}`);

      fetchTickets();
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  // function getEmptyRegions(openTicketsByRegion) {
  //   const allRegions = [
  //     "Northern",
  //     "Southern",
  //     "Southwest",
  //     "Eastern",
  //     "Western",
  //     "Central",
  //   ]; // Replace with your actual region names
  //   const regionsWithTickets = openTicketsByRegion.map((region) => region._id);
  //   return allRegions.filter((region) => !regionsWithTickets.includes(region));
  // }

  return (
    <>
      <div className="openticketscontianer">
        <div className="opentickets-header">
          <h2>Closed Tickets</h2>

          {/* <div className="opentickets-section">
            {ticketStats.openTicketsByRegion.map((region) => (
              <p key={region._id}>
                {region._id}: {region.count}
              </p>
            ))}
            {getEmptyRegions(ticketStats.openTicketsByRegion).map((region) => (
              <p key={region}>{region}: 0</p>
            ))}
          </div> */}
          <div className="openticketsfilter">
            <div className="opensearchinput">
              <input
                type="text"
                placeholder="Search Site"
                value={searchQuery}
                onChange={handleSearchChange}
                className="openticket-input"
              />
            </div>
            {/* <button
              type="button"
              className="date-btn"
              //   onClick={handleDateChange}
            >
              Filter Tickets
            </button> */}
          </div>
        </div>
        <table className="tickettable">
          <thead>
            <tr>
              <th>Ticket number</th>
              <th>Site Name</th>
              <th>Region</th>
              <th>Failure Time</th>
              <th>Restoration Time</th>
              <th>Problem</th>
              <th>Solution</th>
              <th>Opened by</th>
              <th>closedby</th>
              <th>Umemeref</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              // const errorTime = parseISO(ticket.timeoferror);
              // const clearingTime = parseISO(ticket.clearingtime);
              // const formattederrorTime = format(
              //   errorTime,
              //   "dd/MM/yyyy HH:mm'hrs'"
              // );
              // const formattedclearingTime = format(
              //   clearingTime,
              //   "dd/MM/yyyy HH:mm'hrs'"
              // );
              return (
                <tr key={ticket._id}>
                  <td>{`TT ${ticket.ticketnumber}`}</td>
                  <td>{ticket.sitename}</td>
                  <td>{ticket.region}</td>
                  <td>{ticket.timeoferror}</td>
                  <td>{ticket.timeofrestoration}</td>
                  <td>{ticket.problem}</td>
                  <td>{ticket.solution}</td>
                  <td>{ticket.openedby}</td>
                  <td>{ticket.closedby}</td>
                  <td>{ticket.umemeref}</td>
                  <td>
                    <div className="tablebuttons">
                      <Link to={`/tickets/closedtickets/${ticket._id}`}>
                        <button className="table-button">Change details</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      ;
    </>
  );
}

export default Closedtickets;
