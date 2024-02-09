import React, { useState } from "react";
import "./sites.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Addsite() {
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState({
    name: "",
    region: "",
    classification: "",
    power_source: "",
    affected_sites: [],
    services_offered: [],
    is_switched_off_at_night: false,
  });

  const navigate = useNavigate();

  const [sitesAffected, setSitesAffected] = useState([]);
  const [newSiteaffected, setNewSiteaffected] = useState("");
  const [servicesOffered, setServicesOffered] = useState([]);
  const [newServiceOffered, setNewServiceOffered] = useState("");
  const [isSwitchedOff, setIsSwitchedOff] = useState(false);

  const handleRadioChange = (event) => {
    setIsSwitchedOff(event.target.value === "true");
  };

  const addServiceOffered = () => {
    if (newServiceOffered.trim() !== "") {
      setServicesOffered([...servicesOffered, newServiceOffered]);
      setNewServiceOffered("");
    }
  };

  const removeServiceOffered = (index) => {
    const updatedServicesOffered = [...servicesOffered];
    updatedServicesOffered.splice(index, 1);
    setServicesOffered(updatedServicesOffered);
  };

  const addSite = () => {
    if (newSiteaffected.trim() !== "") {
      setSitesAffected([...sitesAffected, newSiteaffected]);
      setNewSiteaffected(""); // Reset the input field
    }
  };

  const removeSite = (index) => {
    const updatedSitesAffected = [...sitesAffected];
    updatedSitesAffected.splice(index, 1);
    setSitesAffected(updatedSitesAffected);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    // console.log(value);
    setNewSite((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const siteData = {
        name: newSite.name,
        region: newSite.region,
        classification: newSite.classification,
        power_source: newSite.power_source,
        affected_sites: sitesAffected,
        services_offered: servicesOffered,
        is_switched_off_at_night: isSwitchedOff,
      };

      console.log(siteData);
      const response = await axios.post(
        "http://localhost:4000/sites",
        siteData
      );
      console.log("Site created successfully:", response.data);

      setNewSite({
        name: "",
        region: "",
        classification: "",
        power_source: "",
        affected_sites: [],
        services_offered: [],
        is_switched_off_at_night: false,
      });
      navigate("/sites/allsites");
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };
  return (
    <>
      <div className="newticketcontaier">
        <form onSubmit={handleSubmit}>
          {/* Add New Ticket */}
          <h4 className="openticket-header">Add New Site</h4>

          <div className="sitesection">
            <div>
              <label className="openticket-label">Site Name: </label>
              <input
                type="text"
                name="name"
                value={newSite.name}
                onChange={handleChange}
                className="openticket-input"
              />
            </div>
            <div>
              <label className="openticket-label">Region: </label>
              <input
                type="text"
                name="region"
                value={newSite.region}
                onChange={handleChange}
                className="openticket-input"
              />
            </div>
            <div>
              <label className="openticket-label">Classification: </label>
              <input
                type="text"
                name="classification"
                value={newSite.classification}
                onChange={handleChange}
                className="openticket-input"
              />
            </div>
          </div>
          <div className="sitesection">
            <div>
              <label className="openticket-label">Power Source: </label>
              <input
                type="text"
                name="power_source"
                value={newSite.power_source}
                onChange={handleChange}
                className="openticket-input"
              />
            </div>
            <div className="switch-off-radio">
              <label className="radio-label">Switch Off at Night:</label>

              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="isSwitchedOff"
                    value="true"
                    checked={isSwitchedOff}
                    onChange={handleRadioChange}
                  />
                  Yes
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="isSwitchedOff"
                    value="false"
                    checked={!isSwitchedOff}
                    onChange={handleRadioChange}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="affectedsitesdiv">
            <input
              type="text"
              value={newSiteaffected}
              onChange={(e) => setNewSiteaffected(e.target.value)}
              placeholder="Add a new site affected"
              className="openticket-input"
            />

            <button
              type="button"
              className="newticket-submitbtn sitebtn"
              onClick={addSite}
            >
              Add Site
            </button>
          </div>
          {sitesAffected.length > 0 && (
            <div>
              <h4 className="openticket-header">Sites Affected</h4>
              <div className="sitesaaffectedlist">
                <div>
                  {sitesAffected.map((site, index) => (
                    <p
                      key={index}
                      className="siteparagraph"
                      style={{
                        margin: "5px 0px",
                        cursor: "pointer",
                        //   backgroundColor: "white",
                      }}
                    >
                      <span>{site}</span>
                      <button
                        onClick={() => removeSite(index)}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          padding: "4px 8px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="affectedsitesdiv">
            <input
              type="text"
              value={newServiceOffered}
              onChange={(e) => setNewServiceOffered(e.target.value)}
              placeholder="Add a new service offered"
              className="openticket-input"
            />

            <button
              type="button"
              className="newticket-submitbtn sitebtn"
              onClick={addServiceOffered}
            >
              Add Service
            </button>
          </div>
          {servicesOffered.length > 0 && (
            <div>
              <h4 className="openticket-header">Services Offered</h4>
              <div className="sitesaaffectedlist">
                {servicesOffered.map((service, index) => (
                  <p
                    key={index}
                    className="siteparagraph"
                    style={{
                      margin: "5px 0px",
                      cursor: "pointer",
                      //   backgroundColor: "white",
                    }}
                  >
                    <span>{service}</span>
                    <button
                      onClick={() => removeServiceOffered(index)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </p>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="newticket-submitbtn">
            Submit Site
          </button>
        </form>
      </div>
    </>
  );
}

export default Addsite;
