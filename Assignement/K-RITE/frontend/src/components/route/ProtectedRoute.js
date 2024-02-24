import React, { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// function ProtectedRoute(props) {
//   const { Component } = props;
//   const navigate = useNavigate();

//   const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     navigate("/login");
//   }

//   return (
//     <div>
//       <Component />
//     </div>
//   );
// }
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
