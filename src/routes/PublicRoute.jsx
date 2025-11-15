import React from "react";
import useAuth from "../context/useAuth.js";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
