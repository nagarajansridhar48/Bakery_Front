import React from "react";
import { Navigate } from "react-router";

const AdminRoutes = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role !== "admin") {
    return <Navigate to="/login" replace />; // block non-admin
  }
  return children;
};

export default AdminRoutes;