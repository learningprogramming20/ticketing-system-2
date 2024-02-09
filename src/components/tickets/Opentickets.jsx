import React, { useEffect, useState } from "react";
import "./Opentickets.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { useAuth } from "../context/authContext";

function Opentickets() {
  const [tickets, setTickets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ticketStats, setTicketStats] = useState({
    totalAllTickets: 0,
    totalOpenTickets: 0,
    totalClosedTickets: 0,
    totalOpenTicketsToday: 0,
    totalClosedTicketsToday: 0,
    openTicketsByRegion: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    // Fetch all running tickets initially
    fetchTickets();
    // }, []);
  }, [searchQuery]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/opentickets");
      console.log(response.data);
      const filteredTickets = response.data.tickets.filter((ticket) =>
        ticket.sitename.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setTickets(filteredTickets);

      setTicketStats({
        // totalAllTickets: response.data.alltickets,
        totalOpenTickets: response.data.totalTickets,
        totalClosedTickets: response.data.totalClosedTickets,
        totalOpenTicketsToday: response.data.ticketsOpenedToday,
        totalClosedTicketsToday: response.data.ticketsClosedToday,
        // openTicketsByRegion: response.data.openTicketsByRegion,
      });

      console.log(response.data.ticketsClosedToday);
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
          <h2>Ticket List</h2>
          <div className="opentickets-section">
            {/* <h2>Ticket Statistics</h2> */}
            {/* <p>Total Tickets: {ticketStats.totalAllTickets}</p> */}
            <p>Total Open Tickets: {ticketStats.totalOpenTickets}</p>
            <p>Total Open Tickets today: {ticketStats.totalOpenTicketsToday}</p>
            <p>Total Closed Tickets: {ticketStats.totalClosedTickets}</p>
            <p>
              Total Closed Tickets today: {ticketStats.totalClosedTicketsToday}
            </p>
          </div>
          <h3>Open Tickets By Region</h3>

          <div className="opentickets-section">
            {/* {ticketStats.openTicketsByRegion.map((region) => (
              <p key={region._id}>
                {region._id}: {region.count}
              </p>
            ))}
            {getEmptyRegions(ticketStats.openTicketsByRegion).map((region) => (
              <p key={region}>{region}: 0</p>
            ))} */}
          </div>

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
              <th>Ticket Number</th>
              <th>Opened By</th>
              <th>Node Name</th>
              <th>Failure Time</th>
              <th>Problem</th>
              <th>Current Status</th>
              <th>Umemeref</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const errorTime = parseISO(ticket.timeoferror);
              const formattedDate = format(errorTime, "dd/MM/yyyy HH:mm'hrs'");

              return (
                <tr key={ticket._id}>
                  <td>{`TT ${ticket.ticketnumber}`}</td>
                  <td>{ticket.openedby}</td>
                  <td>{ticket.sitename}</td>
                  <td>{formattedDate}</td>
                  <td>{ticket.problem}</td>
                  <td>{ticket.currentstatus}</td>
                  <td>{ticket.umemeref}</td>
                  {/*
                   */}
                  <td>
                    <div className="tablebuttons">
                      <Link to={`/tickets/updateopenticket/${ticket._id}`}>
                        <button className="table-button"> Update</button>
                      </Link>
                      <Link to={`/tickets/closeticket/${ticket._id}`}>
                        <button className="table-button">Close</button>
                      </Link>
                      {/* <button
                        className="table-button"
                        onClick={() => {
                          deleteTicket(ticket._id);
                        }}
                      >
                        delete
                      </button> */}

                      {user && user.roles.includes("admin") && (
                        <button
                          className="table-button"
                          onClick={() => deleteTicket(ticket._id)}
                        >
                          delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Opentickets;
