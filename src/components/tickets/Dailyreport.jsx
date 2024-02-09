import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseISO, format, differenceInDays } from "date-fns";

const ExcelJS = require("exceljs");

function Dailyreport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dailyreport");
        console.log(response.data);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const downloadexcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Define column names
    const columnNames = [
      "Ticket number",
      "Site Name",
      "Classification",
      "Region",
      "Ageing",
      "current status",
      "Umemeref",
      "Opened Date",
      "Power source",
    ];

    // Add column names as the first row in the worksheet
    worksheet.addRow(columnNames);

    // Add data to the worksheet
    reports.forEach((report) => {
      const errorTime = parseISO(report.timeoferror);
      const formattedDate = format(errorTime, "dd/MM/yyyy HH:mm'hrs'");

      const aging = differenceInDays(new Date(), errorTime);

      const rowValues = [
        report.ticketnumber,
        report.sitename,
        report.report.siteclassification,
        report.region,
        aging,
        report.sitestatus,
        report.umemeref,
        formattedDate,
        report.powersource,
      ];

      // Add the row to the worksheet
      const row = worksheet.addRow(rowValues);

      // Check if the "Closed by" column has a value and apply green color to the entire row
      // if (report.closedby) {
      //   row.eachCell({ includeEmpty: true }, (cell) => {
      //     cell.fill = {
      //       type: "pattern",
      //       pattern: "solid",
      //       fgColor: { argb: "00FF00" }, // Green color
      //     };
      //   });
      // }

      // Check if the "Closed by" column has a value and apply green color to the entire row
      if (report.closedby !== "") {
        // if (report.closedby) {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "00FF00" }, // Green color
          };
        });
      }
    });

    // Save the workbook to a file or stream it as needed
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "reports.xlsx";
      link.click();
    });
  };

  return (
    <div className="openticketscontianer">
      <div className="reportsdeader">
        <h2>Outage Report</h2>
        <button className="ticket-header-btn" onClick={downloadexcel}>
          Download
        </button>
      </div>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket number</th>
            <th>Site Name</th>
            <th>Classification</th>
            <th>Region</th>
            <th>Ageing</th>
            {/* <th>Problem</th> */}
            <th>current status</th>
            <th>Umemeref</th>
            <th>Opened Date</th>
            <th>Power source</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((ticket) => {
            const errorTime = parseISO(ticket.timeoferror);
            const formattedDate = format(errorTime, "dd/MM/yyyy HH:mm'hrs'");

            const aging = differenceInDays(new Date(), errorTime);

            return (
              // <tr
              //   key={ticket._id}
              //   style={{ backgroundColor: ticket.closedby ? "#00FF00" : "" }}
              // >
              <tr
                key={ticket._id}
                style={{
                  backgroundColor: ticket.closedby !== "" ? "#00FF00" : "",
                }}
              >
                <td>{`TT${ticket.ticketnumber}`}</td>
                <td>{ticket.sitename}</td>
                <td>{ticket.siteclassification}</td>
                <td>{ticket.region}</td>
                <td>{aging}</td>
                {/* <td>{ticket.problem}</td> */}
                <td>
                  <p>
                    {ticket.problem} <br /> {ticket.currentstatus}
                  </p>
                </td>
                <td>{ticket.umemeref}</td>
                <td>{formattedDate}</td>
                <td>{ticket.powersource}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dailyreport;
