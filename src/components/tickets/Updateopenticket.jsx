import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from "date-fns";
import "./Closeticket.css";

function Updateopenticket() {
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    umemeref: "",
    currentstatus: "",
  });

  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/opentickets/${ticketId}`
        );
        setFormData(response.data.ticket);
        // const { _id, ...ticketWithoutId } = response.data.ticket;
        // setTicket(ticketWithoutId);
        console.log(response.data.ticket);

        const errortime = response.data.ticket.timeoferror;

        //update this just use datetime
        const parsedClearingTime = errortime
          ? parseISO(errortime, "dd/MM/yyyy HH:mm", new Date())
          : new Date();

        setStartDate(parsedClearingTime);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchTicket();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketdata = {
      ...formData,
      timeoferror: startDate,
      //   umemeref: umemeref,
    };

    console.log(ticketdata);
    try {
      const response = await axios.put(
        `http://localhost:4000/opentickets/${ticketId}`,
        ticketdata
        // {
        //   sitestatus: changestatus,
        // }
      );
      // console.log(response.data);
      const reportResponse = await axios.put(
        `http://localhost:4000/dailyreport/${ticketId}`,
        {
          currentstatus: formData.currentstatus,
          umemeref: formData.umemeref,
          timeoferror: startDate,
        }
      );

      await axios.put(`http://localhost:4000/monthlyreport/${ticketId}`, {
        currentstatus: formData.currentstatus,
        umemeref: formData.umemeref,
        timeoferror: startDate,
      });
      navigate("/tickets/opentickets");
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
          </div>
          <div className="closingticketdiv">
            <div className="timeoferror">
              <label className="openticket-label">Time of error: </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
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

          <div className="problemdescription">
            <div>
              <label>Update Status:</label>
            </div>

            <textarea
              name="currentstatus"
              value={formData.currentstatus}
              onChange={handleChange}
              style={{
                width: "100%",
                height: "100px",
                resize: "none",
                margin: "10px 0",
                outline: "none",
                border: "1px solid #ccc",
                fontSize: "15px",
              }}
            />
          </div>

          <div className="problemdescription">
            <div>
              <label>Problem Description:</label>
            </div>

            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              style={{
                width: "100%",
                height: "100px",
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

export default Updateopenticket;
