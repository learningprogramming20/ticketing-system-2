import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Switchedoffatnight() {
  const [sites, setSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch all running tickets initially
    fetchSites();
    // }, []);
  }, [searchQuery]);

  const fetchSites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/sites/switched-off-at-night"
      );
      console.log(response.data);
      const filteredSites = response.data.filter((site) =>
        site.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSites(filteredSites);
      // setSites(response.data);
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const deleteSite = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/sites/${id}`);

      fetchSites();
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div>
      <h2>All Sites</h2>
      <div className="openticketsfilter">
        <div className="opensearchinput">
          <input
            type="text"
            placeholder="Search Site"
            value={searchQuery}
            onChange={handleSearchChange}
            className="openticket-input"
          />
        </div>
      </div>
      <div>
        {sites.map((site) => {
          return (
            <div key={site._id} className="sitecontainer">
              <p>
                <strong>Name:</strong> {site.name}
              </p>
              <p>
                <strong>Region:</strong> {site.region}
              </p>
              <p>
                <strong>Classification:</strong> {site.classification}
              </p>
              <p>
                <strong>Power Source:</strong> {site.power_source}
              </p>
              <p>
                <strong>Affected Sites:</strong>
                {site.affected_sites.join(", ")}
              </p>
              <p>
                <strong>Services Offered:</strong>
                {site.services_offered.join(", ")}
              </p>
              <p>
                <strong>Switched Off at Night:</strong>
                {site.is_switched_off_at_night ? "Yes" : "No"}
              </p>
              <div className="sitebtndiv">
                <Link to={`/sites/edit/${site._id}`}>
                  <button type="button" className="newticket-submitbtn">
                    Edit Site
                  </button>
                </Link>
                <button
                  className="newticket-submitbtn"
                  onClick={() => {
                    deleteSite(site._id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Switchedoffatnight;
