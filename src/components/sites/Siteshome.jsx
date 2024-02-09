import React from "react";
import { Link, Outlet } from "react-router-dom";

function Siteshome() {
  return (
    <>
      <div className="tickets-container">
        <div className="ticketheader">
          <div className="">
            <Link to="allsites">
              <button className="ticket-header-btn">All Sites</button>
            </Link>
            <Link to="newsite">
              <button className="ticket-header-btn">Add Site</button>
            </Link>
            <Link to="switchedoff">
              <button className="ticket-header-btn">
                Sites Switched off At Night
              </button>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Siteshome;
