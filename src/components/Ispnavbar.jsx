import React from "react";
import { Link, Outlet } from "react-router-dom";

function Ispnavbar() {
  return (
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
  );
}

export default Ispnavbar;
