import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, Outlet } from "react-router-dom";
import "./Isphome.css";
import axios from "axios";
import PrivateRoute from "./context/Privateroute";
import Ispnavbar from "./Ispnavbar";

function Isphome() {
  return (
    <>
      <div className="tickets-container">
        <div className="ticketheader">
          <div className="">
            <Link to="addisppnodes">
              <button className="ticket-header-btn">Add Node</button>
            </Link>
            <Link to="openispnodes">
              <button className="ticket-header-btn">Open Nodes</button>
            </Link>
            <Link to="closedispnodes">
              <button className="ticket-header-btn">Closed Nodes</button>
            </Link>
            <Link to="dailyispreport">
              <button className="ticket-header-btn">Dailly Report</button>
            </Link>
            <Link to="monthlyispreport">
              <button className="ticket-header-btn">Monthly Report</button>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Isphome;
