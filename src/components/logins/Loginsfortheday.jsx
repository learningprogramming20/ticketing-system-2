import React, { useState, useEffect } from "react";
import axios from "axios";
import "./loginshome.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Loginsfortheday() {
  const [logins, setLogins] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fetchedReports, setFetchedReports] = useState([]);

  const fetchlogins = async () => {
    try {
      const response = await axios.get("http://localhost:4000/logindetails");
      console.log(response.data);
      //ssetLogins(response.data);

      const filteredlogins = response.data.filter((login) =>
        login.sitename.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setLogins(filteredlogins);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchlogins();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const deletelogin = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/logindetails/${id}`);
      await axios.delete(`http://localhost:4000/alllogindetails/${id}`);
      fetchlogins();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/logindetails/date?startDate=${startDate}&endDate=${endDate}`
      );

      setFetchedReports(response.data);
      console.log("response.data.reports");
      console.log(response.data);
      // setReports(response.data.reports);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportToExcel = () => {
    // const workbook = new ExcelJS.Workbook();
    // const worksheet = workbook.addWorksheet("Monthly Reports");
    // // Add headers
    // const headers = [
    //   "Ticket number",
    //   "Site Name",
    //   "Region",
    //   "Failure Time",
    //   "Restoration Time",
    //   "Reason",
    //   "Current Status",
    //   "Solution",
    //   "Opened by",
    //   "Closed by",
    // ];
    // worksheet.addRow(headers);
    // // Add data
    // reports.forEach((report) => {
    //   worksheet.addRow([
    //     report.ticketnumber,
    //     report.sitename,
    //     report.region,
    //     report.failureTime,
    //     report.restorationTime,
    //     report.problemdesc,
    //     report.sitestatus,
    //     report.solution,
    //     report.createdby,
    //     report.closedby,
    //   ]);
    // });
    // // Save the workbook
    // workbook.xlsx.writeBuffer().then((buffer) => {
    //   const blob = new Blob([buffer], {
    //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //   });
    //   const link = document.createElement("a");
    //   link.href = URL.createObjectURL(blob);
    //   link.download = "MonthlyReports.xlsx";
    //   link.click();
    // });
  };

  return (
    <>
      <div className="openticketscontianer">
        <div className="logins-search">
          {/* <input
            type="text"
            placeholder="Search Site"
            value={searchQuery}
            onChange={handleSearchChange}
            className="loginssearch-input"
          /> */}
          <input
            type="text"
            placeholder="Search Site"
            value={searchQuery}
            onChange={handleSearchChange}
            className="loginssearch-input"
          />
          {/* 
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="loginssearch-input"
          />
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            className="loginssearch-input"
          />
          <button className="ticket-header-btn">Find Logins By Date</button> */}

          <div className="search-section">
            <div>
              <label className="openticket-label"> Start Date :</label>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="loginssearch-input"
              />
            </div>
            <div>
              <label className="openticket-label">End Date:</label>
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="loginssearch-input"
              />
            </div>

            <div>
              <button className="ticket-header-btn" onClick={fetchReports}>
                Fetch Logins
              </button>
              <button
                className="ticket-header-btn"
                onClick={handleExportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>
        </div>

        <div className="all-logins">
          <h2>Logins for the day</h2>
          <table className="login-table">
            <thead>
              <tr>
                <th>Login Ref</th>
                <th>Site Name</th>
                <th>Technician Name</th>
                <th>Login Time</th>
                <th>Reason for Access</th>
                <th>Umeme Reading</th>
                <th>Genset Run Hours</th>
                <th>Fuel Amount (Liters)</th>
                <th>Fuel Level Before</th>
                <th>Fuel Level After</th>
                <th>Logout Time</th>
                <th>Entered By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedReports && fetchedReports.length > 0
                ? fetchedReports.map((login) => (
                    <tr key={login._id}>
                      <td>{`${format(new Date(login.loginref), "dd/MM/yyyy")} ${
                        login.loginnumber
                      }`}</td>
                      <td>{login.sitename}</td>
                      <td>{login.technicianname}</td>
                      <td>
                        {`${format(
                          new Date(login.logintime),
                          "dd/MM/yyyy HH:mm"
                        )}hrs`}
                      </td>
                      <td>{login.reasonforaccess}</td>
                      <td>{login.umemereading}</td>
                      <td>{login.gensetrunhours}</td>
                      <td>{login.fuelamountliters}</td>
                      <td>{login.fuellevelbefore}</td>
                      <td>{login.fuellevelafter}</td>
                      <td>
                        {`${format(
                          new Date(login.logouttime),
                          "dd/MM/yyyy HH:mm"
                        )}hrs`}
                      </td>
                      <td>{login.enteredby}</td>
                      <td>
                        <Link to={`/logins/updateonalllogins/${login._id}`}>
                          <button className="table-button"> Update</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                : logins.map((login) => (
                    <tr key={login._id}>
                      <td>{`${format(new Date(login.loginref), "dd/MM/yyyy")} ${
                        login.loginnumber
                      }`}</td>
                      <td>{login.sitename}</td>
                      <td>{login.technicianname}</td>
                      <td>
                        {`${format(
                          new Date(login.logintime),
                          "dd/MM/yyyy HH:mm"
                        )}hrs`}
                      </td>
                      <td>{login.reasonforaccess}</td>
                      <td>{login.umemereading}</td>
                      <td>{login.gensetrunhours}</td>
                      <td>{login.fuelamountliters}</td>
                      <td>{login.fuellevelbefore}</td>
                      <td>{login.fuellevelafter}</td>
                      <td>
                        {`${format(
                          new Date(login.logouttime),
                          "dd/MM/yyyy HH:mm"
                        )}hrs`}
                      </td>
                      <td>{login.enteredby}</td>
                      <td>
                        <Link to={`/logins/updateonalllogins/${login._id}`}>
                          <button className="table-button"> Update</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Loginsfortheday;
