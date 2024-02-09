import React, { createContext, useContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [userId, setUserId] = useState(localStorage.getItem("userid") || null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);

          if (decodedToken.exp * 1000 < Date.now()) {
            // Token is expired, log the user out
            // console.log("token expired");
            logout();
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          logout();
        }
      }
    };

    checkTokenExpiration();

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, []);

  const login = (newToken, userId) => {
    setToken(newToken);
    setUserId(userId);
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("userid", userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userid");
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// // AuthContext.js
// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(() =>
//     localStorage.getItem("accessToken")
//   );

//   useEffect(() => {
//     // Save the token to localStorage when it changes
//     localStorage.setItem("accessToken", accessToken);
//   }, [accessToken]);

//   const login = (token) => {
//     setAccessToken(token);
//   };

//   const logout = () => {
//     setAccessToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // // AuthContext.js
// // import React, { createContext, useContext, useState } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [token, setToken] = useState(null);

// //   const login = (userData, accessToken) => {
// //     setUser(userData);
// //     setToken(accessToken);
// //     localStorage.setItem("user", JSON.stringify(userData));
// //     localStorage.setItem("token", accessToken);
// //   };

// //   const logout = () => {
// //     setUser(null);
// //     setToken(null);
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //   };

// //   // const isAuthenticated = () => !!user && !!token;
// //   const isAuthenticated = () => !!user;

// //   return (
// //     <AuthContext.Provider
// //       value={{ user, token, login, logout, isAuthenticated }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const history = useHistory();

// //   useEffect(() => {
// //     const storedUser = JSON.parse(localStorage.getItem("user"));

// //     if (storedUser && storedUser.accessToken) {
// //       setUser(storedUser);

// //       // Check if the token has expired
// //       const tokenExpiration = storedUser.expiresIn * 1000; // Convert seconds to milliseconds
// //       const currentTime = new Date().getTime();
// //       const timeDifference = tokenExpiration - currentTime;

// //       if (timeDifference < 0) {
// //         // Token has expired, redirect to login page
// //         logout();
// //       }
// //     }
// //   }, []);

// //   const login = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem("user", JSON.stringify(userData));
// //   };

// //   const logout = () => {
// //     // Clear user details from state and localStorage
// //     setUser(null);
// //     localStorage.removeItem("user");
// //     // Redirect to login page
// //     history.push("/auth/login");
// //   };

// //   const isAuthenticated = () => {
// //     return !!user?.accessToken;
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // // // AuthContext.js
// // // import { createContext, useContext, useState, useEffect } from 'react';

// // // const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem('user');
// // //     if (storedUser) {
// // //       setUser(JSON.parse(storedUser));
// // //     }
// // //   }, []);

// // //   const login = (userData) => {
// // //     const { accessToken, expiresIn, ...userInfo } = userData;

// // //     localStorage.setItem('user', JSON.stringify(userInfo));
// // //     setUser(userInfo);

// // //     // Set a timeout to automatically refresh the token before it expires
// // //     const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
// // //     setTimeout(refreshToken, expirationTime - new Date());
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('user');
// // //     setUser(null);
// // //   };

// // //   const isAuthenticated = () => {
// // //     // Check if user is logged in and token is not expired
// // //     return !!user && new Date(user.tokenExpiration) > new Date();
// // //   };

// // //   const refreshToken = () => {
// // //     // Make a request to the backend to refresh the token
// // //     // Update the user information with the new token and expiration
// // //     // This is a placeholder, and you should implement the actual refresh logic
// // //     // For simplicity, we assume a successful refresh here
// // //     const newAccessToken = 'newAccessToken'; // Replace with the refreshed token
// // //     const newExpiresIn = 900; // Replace with the new expiration time in seconds

// // //     const newUserInfo = {
// // //       ...user,
// // //       accessToken: newAccessToken,
// // //       tokenExpiration: new Date(new Date().getTime() + newExpiresIn * 1000),
// // //     };

// // //     localStorage.setItem('user', JSON.stringify(newUserInfo));
// // //     setUser(newUserInfo);

// // //     // Set a timeout to automatically refresh the token before it expires again
// // //     const expirationTime = new Date(new Date().getTime() + newExpiresIn * 1000);
// // //     setTimeout(refreshToken, expirationTime - new Date());
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   return useContext(AuthContext);
// // // };

// // // AuthContext.js
// // import React, { createContext, useContext, useState } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [accessToken, setAccessToken] = useState(() =>
// //     localStorage.getItem("accessToken")
// //   );

// //   useEffect(() => {
// //     // Save the token to localStorage when it changes
// //     localStorage.setItem("accessToken", accessToken);
// //   }, [accessToken]);

// //   const login = (token) => {
// //     setAccessToken(token);
// //   };

// //   const logout = () => {
// //     setAccessToken(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ accessToken, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // // // AuthContext.js
// // // import React, { createContext, useContext, useState } from "react";

// // // const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const [token, setToken] = useState(null);

// // //   const login = (userData, accessToken) => {
// // //     setUser(userData);
// // //     setToken(accessToken);
// // //     localStorage.setItem("user", JSON.stringify(userData));
// // //     localStorage.setItem("token", accessToken);
// // //   };

// // //   const logout = () => {
// // //     setUser(null);
// // //     setToken(null);
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("token");
// // //   };

// // //   // const isAuthenticated = () => !!user && !!token;
// // //   const isAuthenticated = () => !!user;

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{ user, token, login, logout, isAuthenticated }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   return useContext(AuthContext);
// // // };

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const history = useHistory();

// // //   useEffect(() => {
// // //     const storedUser = JSON.parse(localStorage.getItem("user"));

// // //     if (storedUser && storedUser.accessToken) {
// // //       setUser(storedUser);

// // //       // Check if the token has expired
// // //       const tokenExpiration = storedUser.expiresIn * 1000; // Convert seconds to milliseconds
// // //       const currentTime = new Date().getTime();
// // //       const timeDifference = tokenExpiration - currentTime;

// // //       if (timeDifference < 0) {
// // //         // Token has expired, redirect to login page
// // //         logout();
// // //       }
// // //     }
// // //   }, []);

// // //   const login = (userData) => {
// // //     setUser(userData);
// // //     localStorage.setItem("user", JSON.stringify(userData));
// // //   };

// // //   const logout = () => {
// // //     // Clear user details from state and localStorage
// // //     setUser(null);
// // //     localStorage.removeItem("user");
// // //     // Redirect to login page
// // //     history.push("/auth/login");
// // //   };

// // //   const isAuthenticated = () => {
// // //     return !!user?.accessToken;
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   return useContext(AuthContext);
// // // };

// // // // // AuthContext.js
// // // // import { createContext, useContext, useState, useEffect } from 'react';

// // // // const AuthContext = createContext();

// // // // export const AuthProvider = ({ children }) => {
// // // //   const [user, setUser] = useState(null);

// // // //   useEffect(() => {
// // // //     const storedUser = localStorage.getItem('user');
// // // //     if (storedUser) {
// // // //       setUser(JSON.parse(storedUser));
// // // //     }
// // // //   }, []);

// // // //   const login = (userData) => {
// // // //     const { accessToken, expiresIn, ...userInfo } = userData;

// // // //     localStorage.setItem('user', JSON.stringify(userInfo));
// // // //     setUser(userInfo);

// // // //     // Set a timeout to automatically refresh the token before it expires
// // // //     const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
// // // //     setTimeout(refreshToken, expirationTime - new Date());
// // // //   };

// // // //   const logout = () => {
// // // //     localStorage.removeItem('user');
// // // //     setUser(null);
// // // //   };

// // // //   const isAuthenticated = () => {
// // // //     // Check if user is logged in and token is not expired
// // // //     return !!user && new Date(user.tokenExpiration) > new Date();
// // // //   };

// // // //   const refreshToken = () => {
// // // //     // Make a request to the backend to refresh the token
// // // //     // Update the user information with the new token and expiration
// // // //     // This is a placeholder, and you should implement the actual refresh logic
// // // //     // For simplicity, we assume a successful refresh here
// // // //     const newAccessToken = 'newAccessToken'; // Replace with the refreshed token
// // // //     const newExpiresIn = 900; // Replace with the new expiration time in seconds

// // // //     const newUserInfo = {
// // // //       ...user,
// // // //       accessToken: newAccessToken,
// // // //       tokenExpiration: new Date(new Date().getTime() + newExpiresIn * 1000),
// // // //     };

// // // //     localStorage.setItem('user', JSON.stringify(newUserInfo));
// // // //     setUser(newUserInfo);

// // // //     // Set a timeout to automatically refresh the token before it expires again
// // // //     const expirationTime = new Date(new Date().getTime() + newExpiresIn * 1000);
// // // //     setTimeout(refreshToken, expirationTime - new Date());
// // // //   };

// // // //   return (
// // // //     <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // };

// // // // export const useAuth = () => {
// // // //   return useContext(AuthContext);
// // // // };
