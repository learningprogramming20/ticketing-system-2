import React from "react";
import { Route, Redirect, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

// const AdminRoute = ({ component: Component, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user && user.roles.includes('admin') ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/unauthorized" />
//         )
//       }
//     />
//   );
// };

// const AdminRoute = ({ role }) => {
//   const { user } = useAuth();
//   if (!user || !user.roles.includes(role)) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   return <Outlet />;
// };

// export default AdminRoute;

const AdminRoute = ({ role, children }) => {
  const { user } = useAuth();
  // Log user object for debugging
  console.log("User:", user);

  if (!user || !user.roles.includes(role)) {
    console.log("not admin");
    return <Navigate to="/auth/login" replace />;
  } else {
    console.log("is admin");
    // return <Navigate to="/auth/login" replace />;
    return children;
  }
};

export default AdminRoute;

//  <Route path="/unauthorized" component={UnauthorizedPage} />
//         <AdminRoute path="/admin-dashboard" component={Dashboard} />

// For an admin-only route:
{
  /* <Route path="/admin" element={<PrivateRoute role="admin" />}>
  <AdminDashboard />
</Route>

// For routes accessible to both admins and other roles:
<Route path="/protected" element={<PrivateRoute role={['admin', 'moderator']} />}>
  <ProtectedContent />
</Route> */
}
