import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, Outlet } from "react-router-dom";
import "./Ticketshome.css";
import axios from "axios";

function Ticketshome() {
  return (
    <>
      <div className="tickets-container">
        <div className="">
          <div className="ticketheader">
            <Link to="newticket">
              <button className="ticket-header-btn">New Tickets</button>
            </Link>
            <Link to="opentickets">
              <button className="ticket-header-btn">Open Tickets</button>
            </Link>
            <Link to="closedtickets">
              <button className="ticket-header-btn">Closed Tickets</button>
            </Link>
            <Link to="dailyoutagepreport">
              <button className="ticket-header-btn">Dailly Report</button>
            </Link>
            <Link to="monthlyreport">
              <button className="ticket-header-btn">Monthly Report</button>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Ticketshome;
