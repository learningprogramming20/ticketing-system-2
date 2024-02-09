import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import "./Closeticket.css";

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

function Closeticket() {
  const [ticket, setTicket] = useState("");
  const [user, setUser] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    closedbymethod: "",
    closingdepartment: "",
    closedby: "",
    solution: "",
    timeofrestoration: "",
    assigntechnician: "",
    umemeref: "",
  });

  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    // Fetch user data based on user ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/65a55eee541e22caa735f6d7`
        );
        const userData = response.data;
        setUser(response.data);

        setFormData((prevData) => ({
          ...prevData,
          user: userData._id,
          closedby: userData.name,
          usernumber: userData.telephone,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [formData.userid]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/opentickets/${ticketId}`
        );
        setTicket(response.data.ticket);
        setFormData(response.data.ticket);
        console.log(response.data.ticket);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchTicket();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const closedTicketData = {
      userclosedid: user._id,
      openedby: ticket.openedby,
      email: ticket.email,
      telephonenumber: ticket.telephonenumber,
      officenumber: ticket.officenumber,
      sitename: ticket.sitename,
      region: ticket.region,
      affectedareas: ticket.affectedareas,
      servicesaffected: ticket.servicesaffected,
      typeoffault: ticket.typeoffault,
      timeoferror: ticket.timeoferror,
      problem: ticket.problem,
      ticketnumber: ticket.ticketnumber,
      siteclassification: ticket.siteclassification,
      powersource: ticket.powersource,
      currentstatus: "Site now okay",
      umemeref: formData.umemeref,
      closedby: user.name,
      assigntechnician: formData.assigntechnician,
      priority: ticket.priority,
      escalationlevel: ticket.escalationlevel,
      timeofrestoration: startDate,
      solution: formData.solution,
      closedbymethod: formData.closedbymethod,
      closingdepartment: formData.closingdepartment,
    };

    // console.log(ticket);
    console.log("closed ticket");
    console.log(closedTicketData);
    // navigate("/closedtickets");

    const resportdata = {
      closedby: user.name,
      currentstatus: formData.solution,
      umemeref: formData.umemeref,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/closedtickets",
        closedTicketData
      );
      console.log(response.data);

      const reportResponse = await axios.put(
        `http://localhost:4000/dailyreport/${ticketId}`,
        resportdata
      );
      await axios.put(
        `http://localhost:4000/monthlyreport/${ticketId}`,
        resportdata
      );

      await axios.delete(`http://localhost:4000/opentickets/${ticketId}`);

      navigate("/tickets/closedtickets");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <>
      <div className="newticketcontaier">
        <form onSubmit={handleSubmit}>
          <div className="ticketsectionone">
            <div className="ticketinfo">
              <p>
                <strong>Ticket Number:</strong>{" "}
                <span>{`TT ${ticket.ticketnumber}`}</span>
              </p>
              <p>
                <strong>Site Name:</strong> <span>{ticket.sitename}</span>
              </p>
              <p>
                <strong>Site Region:</strong> <span>{ticket.region}</span>
              </p>
              <p>
                <strong>Opened By:</strong> <span>{ticket.openedby}</span>
              </p>
              <p>
                <strong>Time of Error:</strong>
                <span>{ticket.timeoferror}</span>
              </p>
              <p>
                <strong>Problem:</strong> <span>{ticket.problem}</span>
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
                  {ticket.affectedareas
                    ? ticket.affectedareas.join(", ")
                    : "N/A"}
                </span>
              </div>

              {/* Display services affected */}
              <div>
                <strong>Services Affected:</strong>
                <span>
                  {ticket.servicesaffected
                    ? ticket.servicesaffected.join(", ")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="closingticketdiv">
            <div className="">
              <label className="openticket-label">Cleared By:</label>
              <select
                name="closedbymethod"
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

          <div className="closingticketdiv">
            <div className="">
              <label className="openticket-label">Clearing time: </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                // dateFormat="dd/MM/yyyy"
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                className="openticket-input"
              />
            </div>
            <div>
              <label className="openticket-label">Umeme Ref: </label>
              <input
                type="text"
                name="umemeref"
                value={formData.umemeref}
                onChange={handleChange}
                className="openticket-input"
              />
            </div>
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

          <button
            type="submit"
            className="newticket-submitbtn"
            //   disabled={isSubmitting}
            //   style={{
            //     backgroundColor: isSubmitting ? "gray" : " #4caf50",
            //   }}
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </>
  );
}

export default Closeticket;
