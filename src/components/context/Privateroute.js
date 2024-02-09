// PrivateRoute.js
import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoute = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

// // PrivateRoute.js
// import React from "react";
// import { Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "./authContext";

// // const PrivateRoute = ({ element, ...rest }) => {
// //   // function PrivateRoute({ children }) {
// //   const { accessToken } = useAuth();

// //   return accessToken ? (
// //     <Route {...rest} element={element} />
// //   ) : (
// //     <Navigate to="/auth/login" />
// //   );

// //   //   const { isAuthenticated } = useAuth(); // Add your authentication logic from AuthContext

// //   //   return isAuthenticated ? (
// //   //     <Route>{children}</Route>
// //   //   ) : (
// //   //     <Navigate to="/auth" replace />
// //   //   );
// // };
// const PrivateRoute = ({ children }) => {
//   const { accessToken } = useAuth();

//   const navigate = useNavigate();
//   const location = useLocation();

//   return accessToken ? children : <Navigate to="/auth/login" />;
// };

// export default PrivateRoute;

// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "./authContext";

// const PrivateRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated() ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/auth/login" replace />
//   );
// };

// export default PrivateRoute;
