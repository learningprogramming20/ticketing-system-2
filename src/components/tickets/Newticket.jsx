import React, { useEffect, useState } from "react";
import "./Newticket.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const faultTypes = [
  "Maintenance Degraded",
  "Maintenance Outage",
  "Scheduled Maintenance",
  "Degraded Condition",
  "Outage Condition",
  "Critical Condition",
  "Emergency",
];

const servicesAffected = [
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

function Newticket() {
  const [sites, setSites] = useState([]);
  const [site, setSite] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    useropenedid: "",
    userclosedid: "",
    openedby: "",
    email: "",
    telephonenumber: "",
    officenumber: "",
    sitename: "",
    region: "",
    affectedareas: [],
    servicesaffected: [],
    typeoffault: [],
    timeoferror: new Date(),
    problem: "",
    ticketnumber: "",
    siteclassification: "",
    powersource: "",
    currentstatus: "",
    umemeref: "",
    closedby: "",
    assigntechnician: "",
    priority: "",
    escalationlevel: "Level 1",
    timeofrestoration: null,
    solution: "",
    closedbymethod: "",
    closingdepartment: "",

    // userid: "",
    // openedby: "",
    // usernumber: 0,
    // closedby: "",
    // sitename: "",
    // region: "",
    // sitestatus: "",
    // affectedareas: [],
    // problem: "",
    // faulttypes: [],
    // servicesaffected: [],
    // timeoferror: "",
    // ticketnumber: 0,
    // umemeref: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch sites from the server when the component mounts
    const fetchSites = async () => {
      try {
        const response = await axios.get("http://localhost:4000/sites");
        // console.log("response.data");
        // console.log(response.data);
        setSites(response.data.sites);
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, []);

  useEffect(() => {
    // Fetch user data based on user ID
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/65a55eee541e22caa735f6d7`
        );
        const userData = response.data;
        console.log(userData);

        setFormData((prevData) => ({
          ...prevData,
          useropenedid: userData._id,
          email: userData.email,
          openedby: userData.name,
          telephonenumber: userData.phonenumber,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [formData.userid]);
  const handleSiteChange = (event) => {
    const selectedSiteName = event.target.value;
    const site = sites.find((site) => site.name === selectedSiteName);

    setFormData((prevData) => ({
      ...prevData,
      sitename: selectedSiteName,
      region: site.region,
      affectedareas: site.affected_sites,
      powersource: site.power_source,
      siteclassification: site.classification,
    }));

    setSite({
      sitename: site.name,
      region: site.region,
      powersource: site.power_source,
      siteclassification: site.classification,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFaultTypeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );

    setFormData({
      ...formData,
      typeoffault: selectedOptions,
    });
  };
  const handleservicesChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );

    setFormData({
      ...formData,
      servicesaffected: selectedOptions,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketdata = {
      ...formData,
      timeoferror: startDate,
      umemeref: "No reference",
      // currentstatus: formData.currentstatus,
    };

    console.log(ticketdata);

    try {
      const response = await axios.post(
        "http://localhost:4000/opentickets",
        ticketdata,
        {
          headers: {},
        }
      );
      console.log(response.data);

      //   const reportData = {
      //     ...formData,
      //     openticketid: response.data._id,
      //     ticketnumber: response.data.ticketnumber,
      //     closedby: response.data.closedby,
      //     sitestatus: response.data.sitestatus,
      //     umemeref: response.data.umemeref,
      //     timeoferror: response.data.timeoferror,
      //     problem: response.data.problem,
      //   };
      const { _id, ...formDataWithoutId } = formData; // Exclude _id from formData
      const reportData = {
        ...formDataWithoutId,
        openticketid: response.data._id,
        ticketnumber: response.data.ticketnumber,
        closedby: response.data.closedby,
        currentstatus: response.data.currentstatus,
        umemeref: response.data.umemeref,
        timeoferror: response.data.timeoferror,
        problem: response.data.problem,
      };

      console.log("reportData");
      console.log(reportData);

      const reportResponse = await axios.post(
        "http://localhost:4000/dailyreport",

        reportData
      );
      const monthlyreport = {
        ...formDataWithoutId,
        openticketid: response.data._id,
        ticketnumber: response.data.ticketnumber,
        closedby: response.data.closedby,
        currentstatus: response.data.currentstatus,
        umemeref: response.data.umemeref,
        timeoferror: response.data.timeoferror,
        problem: response.data.problem,
      };

      // console.log(reportData);

      await axios.post(
        "http://localhost:4000/monthlyreport",

        monthlyreport
      );
      navigate("/tickets/opentickets");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {/* <div className="newticketcontaier"> */}
      <div className="newticketcontaier">
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">Error: {error}</div>}
          <h4 className="openticket-header">Add New Ticket</h4>
          <div className="openticketsection">
            <div className="">
              <label>Select a Site:</label>
              <select
                name="sitename"
                value={formData.sitename}
                onChange={handleSiteChange}
                className="openticket-input"
              >
                <option value="">Select a site</option>
                {sites.map((site) => (
                  <option key={site._id} value={site.name}>
                    {site.name}
                  </option>
                ))}
              </select>
              <div>
                <p>Selected Region: {formData.region}</p>
                <p>Affected Areas: {formData.affectedareas.join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="openticketsection">
            <div className="">
              <label className="openticket-label">Fault Type:</label>
              <select
                name="typeoffault"
                value={formData.typeoffault}
                onChange={handleFaultTypeChange}
                multiple={true}
                className="openticket-input"
              >
                <option value="">Select Fault Type</option>
                {faultTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <label className="openticket-label">Services Affected: </label>
              <select
                name="servicesaffected"
                value={formData.servicesaffected}
                onChange={handleservicesChange}
                multiple={true}
                className="openticket-input"
              >
                <option value="">Select Services Affected</option>
                {servicesAffected.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
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
          </div>
          <div className="problemdescription">
            <div>
              <label>Current Status:</label>
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

export default Newticket;
