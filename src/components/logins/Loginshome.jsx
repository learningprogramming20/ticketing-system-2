import React, { useState, useEffect } from "react";
import axios from "axios";
import "./loginshome.css";
import { Link, Outlet } from "react-router-dom";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Loginshome() {
  return (
    <>
      <div className="tickets-container">
        <div className="ticketheader">
          <div className="">
            <Link to="/logins/loginsfortheday">
              <button className="ticket-header-btn">Logins For The Day</button>
            </Link>
            <Link to="/logins/addlogins">
              <button className="ticket-header-btn">Add Login</button>
            </Link>
            <Link to="/logins/alllogins">
              <button className="ticket-header-btn">All Logins</button>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Loginshome;
