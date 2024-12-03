import React from "react";
import { createContext, useState, useContext } from "react";

const UserContext = createContext({
  email: ``,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: ``,
    isAuthenticated: false,
  });

  // Login function
  const login = (email) => {
    setUser({ email, isAuthenticated: true });
  };

  // Logout function
  const logout = () => {
    setUser({ email: ``, isAuthenticated: false });
  };

  return (
    <UserContext.Provider value={{ ...user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for consuming the UserContext
export const useUser = () => useContext(UserContext);

export default UserContext;
