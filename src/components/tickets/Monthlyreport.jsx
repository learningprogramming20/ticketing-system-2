import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExcelJS from "exceljs";
import "./Opentickets.css";

function Monthlyreport() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reports, setReports] = useState([]);

  console.log(startDate);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        //   const response = await axios.get(
        //     `http://localhost:4000/monthlyreport?startDate=${startDate}&endDate=${endDate}`
        //   );

        const response = await axios.get("http://localhost:4000/monthlyreport");
        console.log("response");
        console.log(response.data);

        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Monthly Reports");

    // Add headers
    const headers = [
      "Ticket number",
      "Site Name",
      "Region",
      "Failure Time",
      "Restoration Time",
      "Reason",
      "Current Status",
      "Solution",
      "Opened by",
      "Closed by",
    ];
    worksheet.addRow(headers);

    // Add data
    reports.forEach((report) => {
      worksheet.addRow([
        report.ticketnumber,
        report.sitename,
        report.region,
        report.failureTime,
        report.restorationTime,
        report.problemdesc,
        report.sitestatus,
        report.solution,
        report.createdby,
        report.closedby,
      ]);
    });

    // Save the workbook
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "MonthlyReports.xlsx";
      link.click();
    });
  };

  return (
    <div className="">
      <h2>Select dates</h2>
      <div className="select-dates">
        <div>
          <label className="openticket-label">Start Date :</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="openticket-input"
          />
        </div>
        <div>
          <label className="openticket-label">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="openticket-input"
          />
        </div>
        <div>
          <button className="newticket-submitbtn">Fetch Reports</button>
          <button className="newticket-submitbtn">Export to Excel</button>
        </div>
      </div>

      {/* <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket number</th>
            <th>Site Name</th>
            <th>Region</th>
            <th>Failure Time</th>
            <th>Restoration Time</th>
            <th>Problem</th>
            <th>Current Status</th>
            <th>Solution</th>
            <th>Opened by</th>
            <th>Closed by</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{`TT ${report.ticketnumber}`}</td>
              <td>{report.sitename}</td>
              <td>{report.region}</td>
              <td>{report.timeoferror}</td>
              <td>{report.timeofrestoration}</td>
              <td>{report.problem}</td>
              <td>{report.currentstatus}</td>
              <td>{report.solution}</td>
              <td>{report.openedby}</td>
              <td>{report.closedby}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <table className="monthlytable">
        <thead>
          <tr>
            <th>Ticket number</th>
            <th>Site Name</th>
            <th>Region</th>
            <th>Failure Time</th>
            <th>Restoration Time</th>
            <th>Problem</th>
            <th>Current Status</th>
            <th>Solution</th>
            <th>Opened by</th>
            <th>Closed by</th>
            <th>Affected Areas</th>
            <th>Assign Technician</th>
            <th>Closed By Method</th>
            <th>Closing Department</th>
            <th>Power Source</th>
            <th>Site Classification</th>
            <th>Type of Fault</th>
            <th>Umemeref</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{`TT ${report.ticketnumber}`}</td>
              <td>{report.sitename}</td>
              <td>{report.region}</td>
              <td>{report.timeoferror}</td>
              <td>{report.timeofrestoration || "N/A"}</td>
              <td>{report.problem}</td>
              <td>{report.currentstatus || "N/A"}</td>
              <td>{report.solution || "N/A"}</td>
              <td>{report.openedby}</td>
              <td>{report.closedby || "N/A"}</td>
              <td>
                {report.affectedareas ? report.affectedareas.join(", ") : "N/A"}
              </td>
              <td>{report.assigntechnician || "N/A"}</td>
              <td>{report.closedbymethod || "N/A"}</td>
              <td>{report.closingdepartment || "N/A"}</td>

              <td>{report.powersource || "N/A"}</td>
              <td>{report.siteclassification || "N/A"}</td>
              <td>
                {report.typeoffault ? report.typeoffault.join(", ") : "N/A"}
              </td>
              <td>{report.umemeref || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Monthlyreport;
