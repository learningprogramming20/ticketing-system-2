import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Updateticket.css";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";

const closedby = [
  "Open",
  "Work In Progress",
  "Escalated",
  "Pending Parts",
  "Cleared by Maintenance",
  "Closed by NOMC",
];
const clearedby = [
  "Unspecified",
  "Transmission",
  "Fixed",
  "GSM/Mobile",
  "Data",
  "Satellite",
  "Power",
  "WiMax",
  "CDMA",
  "GSM_3G",
  "ADSL",
  "BlackBerry",
  "SEACOM",
  "BSS",
  "WIOCC",
  "ISP",
  "SimbaNet",
];

function Updateclosedticket() {
  const [umemeref, setUmemeref] = useState("");
  const [ticket, setTicket] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const { ticketId } = useParams();

  // // Fetch currently logged-in user details
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:2000/user/2");
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/closedtickets/${ticketId}`
        );
        // setTicket(response.data.ticket);
        // // const { _id, ...ticketWithoutId } = response.data.ticket;
        // // setTicket(ticketWithoutId);
        // console.log("response.data.ticket");
        // console.log(response.data.ticket.umemeref);
        setFormData(response.data.ticket);
        setUmemeref(response.data.ticket.umemeref);

        const clearingTime = response.data.ticket.clearingtime;
        const parsedClearingTime = clearingTime
          ? parseISO(clearingTime, "dd/MM/yyyy HH:mm", new Date())
          : new Date();

        setStartDate(parsedClearingTime);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchTicket();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    //  // Handle the special case for multiple select dropdown
    //  if (name === "clearingdep") {
    //    const selectedOptions = Array.from(
    //      e.target.selectedOptions,
    //      (option) => option.value
    //    );
    //    setFormData((prevData) => ({ ...prevData, [name]: selectedOptions }));
    //  }
    //  else if (name === "closedby") {

    //  } else {
    //    setFormData((prevData) => ({ ...prevData, [name]: value }));
    //  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketdata = {
      ...formData,
      clearingtime: startDate,
      umemeref: umemeref,
    };

    console.log(ticketdata);
    // console.log(startDate);

    const resportdata = {
      sitestatus: formData.solution,
      umemeref: umemeref,
    };

    console.log("formData.ticketId");
    console.log(formData.ticketId);

    try {
      const response = await axios.put(
        `http://localhost:4000/closedtickets/${ticketId}`,
        ticketdata
      );
      console.log(response.data);

      await axios.put(
        `http://localhost:4000/monthlyreport/${ticketId}`,
        ticketdata
      );

      navigate("/tickets/closedtickets");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  // console.log(ticket);
  console.log(formData);
  //   console.log(startDate);

  return (
    <div className="newticketcontaier">
      <form className="updateform" onSubmit={handleSubmit}>
        <div className="ticketinfo">
          <p>
            <strong>Ticket Number:</strong>{" "}
            <span>{`TT ${formData.ticketnumber}`}</span>
          </p>
          <p>
            <strong>Site Name:</strong> <span>{formData.sitename}</span>
          </p>
          <p>
            <strong>Site Region:</strong> <span>{formData.region}</span>
          </p>
          <p>
            <strong>Opened By:</strong> <span>{formData.openedby}</span>
          </p>
          <p>
            <strong>Time of Error:</strong>
            <span>{formData.timeoferror}</span>
          </p>
          <p>
            <strong>Problem:</strong> <span>{formData.problem}</span>
          </p>
          <p>
            <strong>Priority:</strong> <span>HIGH</span>
          </p>
          <p>
            <strong>Escalation Level: </strong>
            <span>
              Message to List 1, List 2, List 3, List 4 and List 5 on Open
              Status (T+0)
            </span>
          </p>
          <div>
            <strong>Affected Areas:</strong>
            <span>
              {formData.affectedareas
                ? formData.affectedareas.join(", ")
                : "N/A"}
            </span>
          </div>

          {/* Display services affected */}
          <div>
            <strong>Services Affected:</strong>
            <span>
              {formData.servicesaffected
                ? formData.servicesaffected.join(", ")
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="closingticketdiv">
          <div className="">
            <label className="openticket-label">Cleared By:</label>
            <select
              name=" closedbymethod"
              value={formData.closedbymethod}
              onChange={handleChange}
              className="openticket-input"
            >
              <option value="">Select who cleared the fault</option>
              {clearedby.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label className="openticket-label">Closed By: </label>
            <select
              name="closingdepartment"
              value={formData.closingdepartment}
              onChange={handleChange}
              className="openticket-input"
            >
              <option value="">Select Department</option>
              {closedby.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="closediv">
            <label className="openticket-label">Assign Tech: </label>
            <select
              name="assigntechnician"
              value={formData.assigntechnician}
              onChange={handleChange}
              className="openticket-input"
            >
              <option value="">Select Department</option>
              {closedby.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="openticket-label">Umeme Ref: </label>
          <input
            type="text"
            name="umemeref"
            value={umemeref}
            onChange={(e) => {
              setUmemeref(e.target.value);
            }}
            className="openticket-input"
          />
        </div>
        <div>
          <div>
            <label>Solution Description:</label>
          </div>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "200px",
              resize: "none",
              margin: "10px 0",
              outline: "none",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />
        </div>

        <button type="submit" className="newticket-submitbtn">
          Update Ticket
        </button>
      </form>
    </div>
  );
}

export default Updateclosedticket;
