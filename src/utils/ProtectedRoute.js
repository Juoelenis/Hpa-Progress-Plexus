import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ path, element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
