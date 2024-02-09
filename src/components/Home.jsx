import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./Home.css";
Chart.register(...registerables);

function Home() {
  // const [user, setUser] = useState([]);
  const { user } = useAuth();
  console.log("user");
  console.log(user);
  // useEffect(() => {
  //   // Fetch user data based on user ID
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:4000/users/65a55eee541e22caa735f6d7`
  //       );
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // Mock data for pie chart (tickets open based on regions)
  const pieChartData = {
    labels: ["Northern", "Eastern", "South", "West"],
    datasets: [
      {
        data: [20, 15, 30, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };

  // Mock data for horizontal bar chart (total tickets open and closed)
  const barChartData = {
    labels: ["Open Tickets", "Closed Tickets"],
    datasets: [
      {
        label: "Total Tickets",
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: ["#FF6384", "#36A2EB"],
        borderWidth: 1,
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        hoverBorderColor: ["#FF6384", "#36A2EB"],
        data: [50, 30],
      },
    ],
  };

  return (
    <>
      <div className="home">
        <div className="homeleft">
          <div className="userprofile">
            <h2>User Profile Information</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Office Number:</strong> {user.officenumber}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phonenumber}
            </p>
            {/* <p>
              <strong>Role:</strong>
              {user.roles && user.roles.length > 0 && (
                <p>
                  <strong>Role:</strong> {user.roles.join(", ")}
                </p>
              )}
            </p> */}
            {user.roles && user.roles.length > 0 && (
              <p>
                <strong>Role:</strong> {user.roles.join(", ")}
              </p>
            )}
          </div>
          <div className="hometickets">
            <h2>Total Tickets</h2>
            <p>
              <strong>Open Tickets:</strong> {100}
            </p>
            <p>
              <strong>Closed Tickets:</strong> {2}
            </p>
          </div>
        </div>
        <div className="homeright">
          <div className="chart">
            <h2>Tickets Open by Region</h2>
            <div className="piechartdiv">
              <Pie
                data={pieChartData}
                options={{
                  title: {
                    display: true,
                    text: "Class Strength",
                    fontSize: 8,
                  },
                  legend: {
                    display: true,
                    // position: "right",
                  },
                  plugins: {
                    // legend: {
                    //   display: false, // Hide the legend
                    // },
                    // tooltip: {
                    //   enabled: false, // Disable the tooltip
                    // },
                  },

                  datalabels: {
                    color: "#fff",
                    formatter: (value, ctx) => {
                      return (
                        ctx.chart.data.labels[ctx.dataIndex] + ": " + value
                      );
                    },
                  },
                }}
              />
            </div>
          </div>
          <div
            className="bargraphdiv"
            // style={{
            //   width: "100%",
            //   height: "250px",
            // }}
          >
            <Bar
              data={barChartData}
              options={{
                indexAxis: "y", // Set the axis to 'y' for a horizontal bar chart
                elements: {
                  bar: {
                    borderWidth: 1, // Set the bar border width
                    borderRadius: 4, // Set the bar border radius
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false, // Hide the legend
                  },
                  tooltip: {
                    enabled: false, // Disable the tooltip
                  },
                },
              }}
            />
          </div>

          {/* <div className="chart">
            <h2>Total Tickets Overview</h2>
            <HorizontalBar data={barChartData} />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
