import "./App.css";
import AddIspnodes from "./components/isp/Addispnodes";
import Isphome from "./components/Isphome";
import Navbar from "./components/Navbar";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import Updateispnode from "./components/Updateispnode";
import Closeispnode from "./components/isp/Closeispnode";
import Closedispnode from "./components/isp/Closedispnode";
import Updateclosedispnode from "./components/Updateclosedispnode";
import Dailyispreports from "./components/isp/Dailyispreports";
import Monthlyispreport from "./components/Monthlyispreport";
import Loginshome from "./components/logins/Loginshome";
import Addlogin from "./components/logins/Addlogin";
import Updatelogin from "./components/logins/Updatelogin";
import Alllogins from "./components/logins/Alllogins";
import Updatealllogins from "./components/logins/Updatealllogins";
import Ticketshome from "./components/Ticketshome";
import Newticket from "./components/tickets/Newticket";
import Opentickets from "./components/tickets/Opentickets";
import Dailyreport from "./components/tickets/Dailyreport";
import Updateopenticket from "./components/tickets/Updateopenticket";
import Closeticket from "./components/tickets/Closeticket";
import Closedtickets from "./components/tickets/Closedtickets";
import Updateclosedticket from "./components/tickets/Updateclosedticket";
import Monthlyreport from "./components/tickets/Monthlyreport";
import Openispnodes from "./components/isp/Openispnodes";
import Loginsfortheday from "./components/logins/Loginsfortheday";
import Home from "./components/Home";
import Siteshome from "./components/sites/Siteshome";
import Allsites from "./components/sites/Allsites";
import Addsite from "./components/sites/Addsite";
import Editsite from "./components/sites/Editsite";
import Switchedoffatnight from "./components/sites/Switchedoffatnight";
import Authhome from "./components/auth/Authhome";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/context/Privateroute";
import Users from "./components/users/Users";
import Adduser from "./components/users/Adduser";
import Edituser from "./components/users/Edituser";
import AdminRoute from "./components/context/AdminRoute";
import Register from "./components/auth/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Authhome />} />
          <Route path="/auth/login" exact element={<Login />} />
          <Route path="/auth/register" exact element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" exact element={<Home />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route
              path="/users"
              element={
                <AdminRoute role="admin">
                  <Users />
                </AdminRoute>
              }
            />
          </Route>

          <Route path="/adduser" exact element={<Adduser />} />
          <Route path="/edituser/:userId" exact element={<Edituser />} />
          <Route
            path="/ispnodes"
            element={<Navigate to="openispnodes" replace />}
          />
          <Route path="/ispnodes" element={<PrivateRoute />}>
            <Route element={<Isphome />}>
              <Route index element={<Openispnodes />} />
              <Route path="openispnodes" exact element={<Openispnodes />} />
              <Route path="addisppnodes" exact element={<AddIspnodes />} />
              <Route
                path="updateispnodes/:nodeId"
                exact
                element={<Updateispnode />}
              />
              <Route
                path="closeispnode/:nodeId"
                exact
                element={<Closeispnode />}
              />
              <Route path="closedispnodes" exact element={<Closedispnode />} />
              <Route
                path="updateclosedispnodes/:nodeId"
                exact
                element={<Updateclosedispnode />}
              />
              <Route
                path="dailyispreport"
                exact
                element={<Dailyispreports />}
              />
              <Route
                path="monthlyispreport"
                exact
                element={<Monthlyispreport />}
              />
            </Route>
          </Route>

          {/* logins */}
          <Route path="/logins" element={<PrivateRoute />}>
            <Route element={<Loginshome />}>
              <Route index element={<Alllogins />} />
              <Route path="alllogins" exact element={<Alllogins />} />
              <Route path="addlogins" exact element={<Addlogin />} />
              <Route
                path="loginsfortheday"
                exact
                element={<Loginsfortheday />}
              />
              <Route
                path="updatelogin/:loginId"
                exact
                element={<Updatelogin />}
              />
              <Route
                path="updateonalllogins/:loginId"
                exact
                element={<Updatealllogins />}
              />
            </Route>
          </Route>

          {/* tickets */}
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route element={<Ticketshome />}>
              <Route index element={<Opentickets />} />
              <Route path="newticket" exact element={<Newticket />} />
              <Route path="opentickets" exact element={<Opentickets />} />
              <Route
                path="dailyoutagepreport"
                exact
                element={<Dailyreport />}
              />
              <Route
                path="updateopenticket/:ticketId"
                exact
                element={<Updateopenticket />}
              />
              <Route
                path="closeticket/:ticketId"
                exact
                element={<Closeticket />}
              />
              <Route path="closedtickets" exact element={<Closedtickets />} />
              <Route
                path="closedtickets/:ticketId"
                exact
                element={<Updateclosedticket />}
              />
              <Route path="monthlyreport" exact element={<Monthlyreport />} />
            </Route>
          </Route>

          {/* sites */}

          <Route path="/sites" element={<PrivateRoute />}>
            <Route element={<Siteshome />}>
              <Route index element={<Allsites />} />
              <Route path="allsites" exact element={<Allsites />} />
              <Route path="newsite" exact element={<Addsite />} />
              <Route path="edit/:siteId" exact element={<Editsite />} />
              <Route
                path="switchedoff"
                exact
                element={<Switchedoffatnight />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
