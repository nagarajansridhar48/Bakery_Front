import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get saved user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (user) {
      // Save user data to localStorage when it changes
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Remove from storage if user logs out
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser, update }}>
      {children}
    </UserContext.Provider>
  );
};
